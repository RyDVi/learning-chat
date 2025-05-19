import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { Chat, Message, User, UserChat } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { WsException } from '@nestjs/websockets';
import { ChatsBetweenDto } from './dto/chatsBetween.dto';
import { ChatMessagesDto } from './dto/chatMessages.dto';
import { MessageToChatDto } from './dto/messageToChat.dto';
import { ChatsSearchDto } from './dto/chatsSearch.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOrCreateUserToUserChat(firstUser: User, secondUser: User) {
    let chat = await this.prismaService.chat.findFirst({
      where: {
        type: 'user_to_user',
        AND: [
          {
            UserChat: {
              some: {
                userId: secondUser.id,
              },
            },
          },
          {
            UserChat: {
              some: {
                userId: firstUser.id,
              },
            },
          },
        ],
      },
      include: {
        UserChat: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        messages: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    if (!chat) {
      console.log(firstUser.id, secondUser.id);
      chat = await this.prismaService.chat.create({
        data: {
          type: 'user_to_user',
          UserChat: {
            create: [{ userId: firstUser.id }, { userId: secondUser.id }],
          },
        },
        include: {
          UserChat: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  phone: true,
                },
              },
            },
          },
          messages: {
            take: 1,
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });
    }

    return chat;
  }

  async createMessage(
    chat: Chat,
    messageDto: MessageDto,
    sender: User,
  ): Promise<Message> {
    const message = await this.prismaService.message.create({
      data: {
        text: messageDto.text,
        senderId: sender.id,
        chatId: chat.id,
      },
    });
    return message;
  }

  async sendMessage(messageDto: MessageDto, sender: User) {
    const receiver = await this.prismaService.user.findUnique({
      where: {
        id: BigInt(messageDto.receiverId),
      },
    });

    if (!receiver) {
      throw new WsException('Receiver not found');
    }

    const chat = await this.getOrCreateUserToUserChat(sender, receiver);
    const message = await this.createMessage(chat, messageDto, sender);
    return message;
  }

  async sendMessageToChat(
    sender: User,
    messageToChat: MessageToChatDto,
  ): Promise<Message & { isCurrentUser: boolean }> {
    const data = await this.prismaService.message.create({
      data: {
        text: messageToChat.text,
        chatId: BigInt(messageToChat.chatId),
        senderId: BigInt(sender.id),
      },
    });

    return { ...data, isCurrentUser: true };
  }

  async chatsSearch(
    user: User,
    {
      searchText,
      onlyOfCurrentUser = false,
    }: Partial<ChatsBetweenDto & ChatsSearchDto> & {
      onlyOfCurrentUser?: boolean;
    },
  ) {
    // const filteredChats = await this.prismaService.chat.findMany({
    //   where: {
    //     UserChat: {
    //       some: {
    //         ...(onlyOfCurrentUser
    //           ? {
    //               userId: user.id,
    //             }
    //           : {}),
    //         ...(searchText
    //           ? {
    //               user: {
    //                 OR: [
    //                   {
    //                     email: searchText,
    //                   },
    //                   {
    //                     phone: searchText,
    //                   },
    //                 ],
    //               },
    //             }
    //           : {}),
    //       },
    //     },
    //   },
    //   include: {
    //     UserChat: {
    //       include: {
    //         user: {
    //           select: {
    //             id: true,
    //             email: true,
    //             phone: true,
    //           },
    //         },
    //       },
    //     },
    //     messages: {
    //       take: 1,
    //       orderBy: {
    //         createdAt: 'desc',
    //       },
    //     },
    //   },
    // });

    const users = await this.prismaService.user.findMany({
      where: {},
    });

    // TODO: вообще, это некорректно, потому что оооочень медленно и займёт очень мноооого памяти, но для изучения достаточно =)
    const chats: Record<
      string,
      Awaited<ReturnType<typeof this.getOrCreateUserToUserChat>>
    > = {};
    for (const secondUser of users) {
      const chat = await this.getOrCreateUserToUserChat(user, secondUser);
      chats[String(chat.id)] = chat;
    }

    const filterByCurrentChat = (chat: Chat & { UserChat: UserChat[] }) =>
      onlyOfCurrentUser
        ? chat.UserChat.some((userChat) => userChat.userId === user.id)
        : true;
    const filterBySearchText = (
      chat: Chat & {
        UserChat: (UserChat & { user: Pick<User, 'email' | 'phone'> })[];
      },
    ) =>
      chat.UserChat.some((userChat) =>
        searchText
          ? userChat.user.email?.includes(searchText) ||
            userChat.user.phone?.includes(searchText)
          : true,
      );

    return Object.values(chats).filter(
      (chat) => filterByCurrentChat(chat) && filterBySearchText(chat),
    );
  }

  async getChatMessages(
    sender: User,
    { chatId }: ChatMessagesDto,
  ): Promise<Message[]> {
    const data = await this.prismaService.message.findMany({
      where: {
        chatId: BigInt(chatId),
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return data.map((message) => ({
      ...message,
      isCurrentUser: message.senderId === sender.id,
    }));
  }
}

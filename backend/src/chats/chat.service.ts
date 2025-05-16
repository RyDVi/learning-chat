import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { Chat, Message, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { WsException } from '@nestjs/websockets';
import { ChatsBetweenDto } from './dto/chatsBetween.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOrCreateUserToUserChat(
    firstUser: User,
    secondUser: User,
  ): Promise<Chat> {
    let chat: Chat | null = await this.prismaService.chat.findFirst({
      where: {
        type: 'user_to_user',
        UserChat: {
          every: {
            userId: {
              in: [secondUser.id, firstUser.id],
            },
          },
        },
      },
    });

    if (!chat) {
      chat = await this.prismaService.chat.create({
        data: {
          type: 'user_to_user',
          UserChat: {
            create: [{ userId: firstUser.id }, { userId: secondUser.id }],
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

  async chatsBetween(user: User, { dateFrom, dateTo }: ChatsBetweenDto) {
    console.log(dateFrom, dateTo);
    const data = await this.prismaService.chat.findMany({
      where: {
        UserChat: {
          some: {
            userId: user.id,
          },
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
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return data;
  }
}

import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';
import { User } from '@prisma/client';
import { WsAuthService } from 'src/auth/wsauth.service';
import { WsAuthorization } from 'src/auth/decorators/wsAuthorization.decorator';
import { WsAuthorized } from 'src/auth/decorators/wsAuthorized.decorator';
import { WsValidationPipes } from './decorators/validation.decorator';
import { Logger, UseFilters } from '@nestjs/common';
import { WsExceptionFilter } from 'src/filters/wsException.filter';
import {
  ChatClientToServerEvents,
  ChatServerToClientEvents,
} from './constants/chat.constants';
import { ChatsBetweenDto } from './dto/chatsBetween.dto';
import { ChatMessagesDto } from './dto/chatMessages.dto';
import { MessageToChatDto } from './dto/messageToChat.dto';
import { ChatsSearchDto } from './dto/chatsSearch.dto';

@WebSocketGateway({ path: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger(ChatGateway.name);

  constructor(
    private readonly chatService: ChatService,
    private readonly wsAuthService: WsAuthService,
  ) {}

  @UseFilters(WsExceptionFilter)
  async handleConnection(client: Socket) {
    try {
      await this.wsAuthService.login(client);
    } catch (err) {
      this.logger.error(err);
      client.disconnect();
    }
    console.log('client connected ', client.id);
  }

  async handleDisconnect(client: Socket) {
    await this.wsAuthService.logout(client);
    console.log('client disconnected ', client.id);
  }

  @WsAuthorization()
  @WsValidationPipes()
  @SubscribeMessage('send/message')
  async handleSendMessage(
    @WsAuthorized() sender: User,
    @MessageBody() data: MessageDto,
  ) {
    return await this.chatService.sendMessage(data, sender);
  }

  @WsAuthorization()
  @WsValidationPipes()
  @SubscribeMessage(ChatClientToServerEvents.ChatsBetween)
  async handleChatsBetween(
    @WsAuthorized() sender: User,
    @MessageBody() data: ChatsBetweenDto,
  ) {
    const chats = await this.chatService.chatsSearch(sender, {
      ...data,
      onlyOfCurrentUser: true,
    });
    this.server.emit(ChatServerToClientEvents.ReceiveChats, chats);
  }

  @WsAuthorization()
  @WsValidationPipes()
  @SubscribeMessage(ChatClientToServerEvents.ChatsSearch)
  async handleChatsSearch(
    @WsAuthorized() sender: User,
    @MessageBody() data: ChatsSearchDto,
  ) {
    const chats = await this.chatService.chatsSearch(sender, data);
    this.server.emit(ChatServerToClientEvents.ReceiveChats, chats);
  }

  @WsAuthorization()
  @WsValidationPipes()
  @SubscribeMessage(ChatClientToServerEvents.ChatMessages)
  /**
   * TODO: это должно быть в отдельном модуле messages, но мне впадлу его писать...
   */
  async handleChatMessages(
    @WsAuthorized() sender: User,
    @MessageBody() data: ChatMessagesDto,
  ) {
    const chats = await this.chatService.getChatMessages(sender, data);
    this.server.emit(ChatServerToClientEvents.ReceiveMessages, chats);
  }

  @WsAuthorization()
  @WsValidationPipes()
  @SubscribeMessage(ChatClientToServerEvents.SendMessageToChat)
  /**
   * TODO: это должно быть в отдельном модуле messages, но мне впадлу его писать...
   */
  async handleSendMessageToChat(
    @WsAuthorized() sender: User,
    @MessageBody() data: MessageToChatDto,
  ) {
    const message = await this.chatService.sendMessageToChat(sender, data);
    this.server.emit(ChatServerToClientEvents.ReceiveMessages, [message]);
  }
}

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

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly wsAuthService: WsAuthService,
  ) {}

  async handleConnection(client: Socket) {
    await this.wsAuthService.login(client);
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
}

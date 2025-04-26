import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsAuthService } from '../wsauth.service';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly wsAuthService: WsAuthService) {}

  canActivate(context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient();

    this.wsAuthService.validate(client);

    return true;
  }
}

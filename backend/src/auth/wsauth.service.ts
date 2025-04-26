import { Injectable } from '@nestjs/common';
import { JwtPayload } from './dto/payload';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Socket } from 'socket.io';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsAuthService {
  private clientsToUser = new Map<string, User>();

  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async login(client: Socket) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(client.request);
    if (!token) throw new WsException('Invalid token');
    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch (errors) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new WsException(errors);
    }
    if (!payload) throw new WsException('Invalid token');

    const user = await this.authService.validate(payload.id);

    this.registerUser(client, user);
  }

  logout(client: Socket) {
    this.unregisterUser(client);
  }

  validate(client: Socket) {
    if (!this.clientsToUser.has(client.id)) {
      throw new WsException('User is not exist');
    }
    const user = this.clientsToUser.get(client.id);
    (client.request as any).user = user;
    return user;
  }

  private registerUser(client: Socket, user: User) {
    this.clientsToUser.set(client.id, user);
  }

  private unregisterUser(client: Socket) {
    this.clientsToUser.delete(client.id);
  }
}

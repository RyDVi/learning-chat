import { Injectable } from '@nestjs/common';
import { JwtPayload } from './dto/payload';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Socket } from 'socket.io';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { WsException } from '@nestjs/websockets';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class WsAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
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

    await this.registerUser(client, user);
  }

  async logout(client: Socket) {
    await this.unregisterUser(client);
  }

  private getUserCacheKey(client: Socket | string) {
    return [
      'clientsToUser',
      typeof client === 'string' ? client : client.id,
    ].join('.');
  }

  private async getCachedUserBySocketId(
    client: Socket | string,
  ): Promise<User | null> {
    const cachedUser = await this.redisService.get(
      this.getUserCacheKey(client),
    );
    if (!cachedUser) return null;

    const parsedUser: Record<string, string> = JSON.parse(cachedUser);
    const user: User = {
      id: BigInt(parsedUser.id),
      createdAt: new Date(parsedUser.createdAt),
      updatedAt: new Date(parsedUser.updatedAt),
      phone: parsedUser.phone,
      email: parsedUser.email,
      password: parsedUser.password,
    };

    return user;
  }

  async validate(client: Socket) {
    const user = await this.getCachedUserBySocketId(client);
    if (!user) {
      throw new WsException('User is not exist');
    }
    (client.request as any).user = user;
    return user;
  }

  private async registerUser(client: Socket | string, user: User) {
    await this.redisService.set(
      this.getUserCacheKey(client),
      JSON.stringify(user),
    );
  }

  private async unregisterUser(client: Socket | string) {
    await this.redisService.del(this.getUserCacheKey(client));
  }
}

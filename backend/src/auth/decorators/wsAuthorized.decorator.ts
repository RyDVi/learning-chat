import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { Socket } from 'socket.io';

export const WsAuthorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request: Socket = ctx.switchToHttp().getRequest();

    const user = (request as any).request.user as User;

    return data ? user[data] : user;
  },
);

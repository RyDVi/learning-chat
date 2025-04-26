import { applyDecorators, UseGuards } from '@nestjs/common';
import { WsAuthGuard } from '../guards/wsauth.guard';

export function WsAuthorization() {
  return applyDecorators(UseGuards(WsAuthGuard));
}

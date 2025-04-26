import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

export function WsValidationPipes() {
  return applyDecorators(
    UsePipes(
      new ValidationPipe({
        exceptionFactory: (errors) => new WsException(errors),
      }),
    ),
  );
}

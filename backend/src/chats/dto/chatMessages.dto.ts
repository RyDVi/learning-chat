import { IsString } from 'class-validator';

export class ChatMessagesDto {
  @IsString()
  chatId: string;
}

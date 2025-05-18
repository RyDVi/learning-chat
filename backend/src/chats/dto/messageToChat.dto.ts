import { IsNotEmpty, IsString } from 'class-validator';

export class MessageToChatDto {
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}

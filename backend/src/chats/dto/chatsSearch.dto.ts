import { IsNotEmpty, IsString } from 'class-validator';

export class ChatsSearchDto {
  @IsNotEmpty()
  @IsString()
  searchText: string;
}

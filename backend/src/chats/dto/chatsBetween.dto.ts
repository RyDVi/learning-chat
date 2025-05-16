import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class ChatsBetweenDto {
  @IsDate()
  @Type(() => Date)
  dateFrom: Date;

  @IsDate()
  @Type(() => Date)
  dateTo: Date;
}

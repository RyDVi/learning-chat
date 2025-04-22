import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  email: string; // Может быть email или phone

  @IsNotEmpty()
  @IsString()
  password: string;
}

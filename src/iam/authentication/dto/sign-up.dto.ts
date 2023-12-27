import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  login: string;

  @MinLength(10)
  password: string;
}

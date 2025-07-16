import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'login', description: 'login' })
  @Length(3, 50)
  @Transform(({ value }) => sanitizeInput(value))
  readonly login: string;

  @IsEmail()
  @ApiProperty({ example: 'asd@asd.com', description: 'email' })
  readonly email: string;

  @IsString()
  @Length(5, 64)
  @ApiProperty({ example: '123456', description: 'password' })
  readonly password: string;
}

function sanitizeInput(input: string): string {
  return String(input)
    .replace(/['";]/g, '') // удаляем кавычки, точку с запятой
    .replace(/--/g, '') // убираем SQL-комментарии
    .replace(/[<>]/g, '') // убираем теги для XSS
    .trim();
}

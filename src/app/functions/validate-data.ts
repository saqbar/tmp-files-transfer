import { HttpException, HttpStatus } from '@nestjs/common';

export function validateLogin(data: any) {
  switch (true) {
    case data.login.length < 3:
      throw new HttpException(
        'Login must be at least 3 characters',
        HttpStatus.BAD_REQUEST,
      );

    case data.login.length > 20:
      throw new HttpException(
        'Login must be at most 20 characters',
        HttpStatus.BAD_REQUEST,
      );

    case data.email.length < 5:
      throw new HttpException(
        'Email must be at least 5 characters',
        HttpStatus.BAD_REQUEST,
      );

    case data.email.length > 64:
      throw new HttpException(
        'Email must be at most 64 characters',
        HttpStatus.BAD_REQUEST,
      );

    case data.password.length < 5:
      throw new HttpException(
        'Password must be at least 5 characters',
        HttpStatus.BAD_REQUEST,
      );

    case data.password.length > 20:
      throw new HttpException(
        'Password must be at most 20 characters',
        HttpStatus.BAD_REQUEST,
      );

    default:
      // все ок
      break;
  }
  return true;
}
export function sanitizeInput(input: string): string {
  return String(input)
    .replace(/['";]/g, '') // удаляем кавычки, точку с запятой
    .replace(/--/g, '') // убираем SQL-комментарии
    .replace(/[<>]/g, '') // убираем теги для XSS
    .trim();
}

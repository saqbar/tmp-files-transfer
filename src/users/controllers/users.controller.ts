import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { validateLogin } from '../../app/functions/validate-data';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create_user')
  async createUser(@Body() body: CreateUserDto, @Res() res) {
    try {
      validateLogin(body);
      body.email.trim().toLowerCase();

      const result = await this.usersService.createUser(body);
      if (result) {
        return res.status(HttpStatus.OK).json(result);
        // return res.status(HttpStatus.OK).json('User created');
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

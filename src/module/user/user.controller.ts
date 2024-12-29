import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetUsers } from '../../decorator/user.decorator';
import { UserDTO } from 'src/dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get()
  getUsers(@GetUsers() user: User) {
    console.log(user);
  }

  @Post('create-user')
  createUser(@Body() dto: UserDTO) {
    return this.UserService.createUser(dto);
  }
}

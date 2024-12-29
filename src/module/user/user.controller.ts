import { Controller, Get } from '@nestjs/common';
import { GetUsers } from '../../decorator/user.decorator';

@Controller('user')
export class UserController {
  constructor() {}
  @Get('users')
  getUsers(@GetUsers() user: any) {
    console.log(user);
  }
}

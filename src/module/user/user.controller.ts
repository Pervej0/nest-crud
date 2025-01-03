import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserDTO } from 'src/dto';
import { UserService } from './user.service';
import { CreateUserInterceptor, UserXlsInterceptor } from './user.interceptor';

@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get()
  getUsers() {
    return this.UserService.getUsers();
  }

  @UseInterceptors(CreateUserInterceptor)
  @Post('create-user')
  createUser(@Body() dto: UserDTO) {
    return this.UserService.createUser(dto);
  }

  @Patch('update-user/:userId')
  updateUser(@Param('') Params: any, @Body() dto: Partial<UserDTO>) {
    return this.UserService.updateUser(Params.userId, dto);
  }

  @Delete('delete-user/:userId')
  deleteUser(@Param() Params: any) {
    return this.UserService.deleteUser(Params.userId);
  }

  @UseInterceptors(UserXlsInterceptor)
  @Get('download-xls')
  exportXLS() {
    return this.UserService.exportXLS();
  }
}

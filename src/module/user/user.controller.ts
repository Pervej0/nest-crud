import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { UserDTO } from 'src/dto';
import { UserService } from './user.service';
import { UserModifiedInterceptor } from './user.interceptor';

@UseInterceptors(UserModifiedInterceptor)
@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get()
  getUsers() {
    return this.UserService.getUsers();
  }

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

  @Get('xls')
  exportXLS(@Res() res: Response) {
    this.UserService.exportXLS(res);
  }
}

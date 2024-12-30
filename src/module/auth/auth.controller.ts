import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from 'src/dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('login')
  login(@Body() dto: AuthDTO) {
    return this.AuthService.login(dto);
  }
}

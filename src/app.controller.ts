import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}
  @Get()
  welcome() {
    return { message: 'Welcome to the NestJS Application!' };
  }
}

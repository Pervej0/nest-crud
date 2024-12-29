import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dto';
import { PrismadbService } from 'src/prismadb/prismadb.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismadbService) {}

  async createUser(dto: UserDTO) {
    console.log(dto, 'pppppp');
  }
}

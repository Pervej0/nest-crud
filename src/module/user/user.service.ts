import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import { UserDTO } from 'src/dto';
import { PrismadbService } from 'src/prismadb/prismadb.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismadbService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        fullName: true,
        email: true,
        phone: true,
        address: true,
        country: true,
        isStudent: true,
      },
    });
    return users;
  }

  async createUser(dto: any) {
    const user = await this.prisma.user.create({ data: dto });

    return user;
  }

  async updateUser(userId: string, dto: any) {
    await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const result = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
    });

    return result;
  }

  async deleteUser(userId: string) {
    try {
      const result = await this.prisma.user.delete({
        where: { id: userId },
      });
      console.log(result, 'pp');

      return result;
    } catch {
      throw new HttpException('Dose not exist', HttpStatus.NOT_FOUND);
    }
  }

  async exportXLS() {
    const users = await this.prisma.user.findMany({
      select: {
        fullName: true,
        email: true,
        phone: true,
        address: true,
        country: true,
        isStudent: true,
      },
    });
    return users;
  }
}

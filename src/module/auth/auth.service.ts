import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismadbService } from 'src/prismadb/prismadb.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismadbService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async login(payload: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new NotFoundException('Invalid user');
    }

    const matchedPassword = await argon2.verify(
      user.password,
      payload.password,
    );

    if (!matchedPassword) {
      throw new UnauthorizedException();
    }

    return this.generateToken(user.id, user.email);
  }

  generateToken(userId: string, email: string) {
    const secretKey = this.config.get('JWT_SECRET');
    const payload = { userId, email };
    const token = this.jwt.sign(payload, {
      expiresIn: '2d',
      secret: secretKey,
    });

    return {
      message: 'Successfully logged in',
      accessToken: token,
    };
  }
}

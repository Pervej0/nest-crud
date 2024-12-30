import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismadbModule } from './prismadb/prisma.module';
import { PrismadbService } from './prismadb/prismadb.service';
import { UserModule } from './module/user/user.module';
import { AppController } from './app.controller';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismadbModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [PrismadbService, ConfigService],
})
export class AppModule {}

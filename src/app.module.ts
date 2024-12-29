import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismadbModule } from './prismadb/prisma.module';
import { PrismadbService } from './prismadb/prismadb.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismadbModule],

  providers: [PrismadbService, ConfigService],
})
export class AppModule {}

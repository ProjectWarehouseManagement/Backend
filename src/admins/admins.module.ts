import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [AdminsController],
  providers: [AdminsService, PrismaService],
})
export class AdminsModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AddressesModule } from 'src/addresses/addresses.module';

@Module({
  imports: [PrismaModule, AddressesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

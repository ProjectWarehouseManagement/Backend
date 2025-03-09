import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AddressesService],
  exports: [AddressesService, PrismaService]
})
export class AddressesModule {}

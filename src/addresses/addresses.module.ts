import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AddressesService, PrismaService],
  exports: [AddressesService]
})
export class AddressesModule {}

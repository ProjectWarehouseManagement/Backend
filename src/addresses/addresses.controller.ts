import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly db: PrismaService) {}

    @Get()
    getAllAddresses() {
        return this.db.address.findMany();
    }
}

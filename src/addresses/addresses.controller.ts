import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly db: PrismaService) {}

    @Get()
    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    getAllAddresses() {
        return this.db.address.findMany();
    }
}

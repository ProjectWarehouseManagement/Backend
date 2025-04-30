import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all addresses' })
    @ApiResponse({ status: 200, description: 'Get all addresses' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    getAllAddresses() {
        return this.db.address.findMany();
    }
}

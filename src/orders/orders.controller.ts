import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDetailsDto, CreateOrderDto, CreateProviderDto } from './dto/create-order.dto';
import { UpdateOrderDetailsDto, UpdateOrderDto, UpdateProviderDto } from './dto/update-order.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Post('orderDetails')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  async createOrderDetails(@Body() createOrderDetailsDto: CreateOrderDetailsDto) {
    return this.ordersService.createOrderDetails(createOrderDetailsDto);
  }

  @Post('provider')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  createProvider(@Body() createProviderDto: CreateProviderDto) {
    return this.ordersService.createProvider(createProviderDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('provider')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  findAllProvider() {
    return this.ordersService.findAllProvider();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Patch('orderDetails/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  updateOrderDetails(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDetailsDto) {
    return this.ordersService.updateOrderDetails(+id, updateOrderDto);
  }

  @Patch('provider/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  updateProvider(@Param('id') id: string, @Body() updateOrderDto: UpdateProviderDto) {
    return this.ordersService.updateProvider(+id, updateOrderDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDetailsDto, CreateOrderDto, CreateProviderDto } from './dto/create-order.dto';
import { UpdateOrderDetailsDto, UpdateOrderDto, UpdateProviderDto } from './dto/update-order.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Post('orderDetails')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create order details' })
  @ApiResponse({ status: 201, description: 'Order details created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createOrderDetails(@Body() createOrderDetailsDto: CreateOrderDetailsDto) {
    return this.ordersService.createOrderDetails(createOrderDetailsDto);
  }

  @Post('provider')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new provider' })
  @ApiResponse({ status: 201, description: 'Provider created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createProvider(@Body() createProviderDto: CreateProviderDto) {
    return this.ordersService.createProvider(createProviderDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiResponse({ status: 200, description: 'List of orders retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('provider')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Retrieve all providers' })
  @ApiResponse({ status: 200, description: 'List of providers retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAllProvider() {
    return this.ordersService.findAllProvider();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Retrieve an order by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the order', type: 'string' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the order', type: 'string' })
  @ApiResponse({ status: 200, description: 'Order updated successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Patch('orderDetails/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update order details by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the order details', type: 'string' })
  @ApiResponse({ status: 200, description: 'Order details updated successfully.' })
  @ApiResponse({ status: 404, description: 'Order details not found.' })
  updateOrderDetails(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDetailsDto) {
    return this.ordersService.updateOrderDetails(+id, updateOrderDto);
  }

  @Patch('provider/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update a provider by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the provider', type: 'string' })
  @ApiResponse({ status: 200, description: 'Provider updated successfully.' })
  @ApiResponse({ status: 404, description: 'Provider not found.' })
  updateProvider(@Param('id') id: string, @Body() updateOrderDto: UpdateProviderDto) {
    return this.ordersService.updateProvider(+id, updateOrderDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the order', type: 'string' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}

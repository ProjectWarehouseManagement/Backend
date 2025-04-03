import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDetailsDto, CreateOrderDto, CreateProviderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('orderDetails')
  async createOrderDetails(@Body() createOrderDetailsDto: CreateOrderDetailsDto) {
    return this.ordersService.createOrderDetails(createOrderDetailsDto);
  }

  @Post('provider')
  createProvider(@Body() createProviderDto: CreateProviderDto) {
    return this.ordersService.createProvider(createProviderDto);
  }


  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}

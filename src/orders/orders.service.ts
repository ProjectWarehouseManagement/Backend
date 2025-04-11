import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailsDto, CreateOrderDto, CreateProviderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { order, orderDetails, provider } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly db: PrismaService) {}

  async createProvider(createProviderDto: CreateProviderDto): Promise<provider> {
    return this.db.provider.create({
      data: createProviderDto,
    });
  }

  async create(createOrderDto: CreateOrderDto): Promise<order> {
    return this.db.order.create({
      data: {
        orderDate: new Date(createOrderDto.orderDate),
        provider: { connect: { id: createOrderDto.providerId } },
      },
      include: {
        provider: true,
        orderDetails: true,
      },
    });
  }

  async createOrderDetails(createOrderDetailsDto: CreateOrderDetailsDto): Promise<orderDetails> {
    return this.db.orderDetails.create({
      data: {
        price: createOrderDetailsDto.price,
        shippingCost: createOrderDetailsDto.shippingCost,
        OrderQuantity: createOrderDetailsDto.OrderQuantity,
        ExpectedDate: createOrderDetailsDto.ExpectedDate,
        order: { connect: { id: createOrderDetailsDto.orderId } },
        product: { connect: { id: createOrderDetailsDto.productId } },
        address: { connect: { id: createOrderDetailsDto.addressId } },
        warehouse: { connect: { id: createOrderDetailsDto.warehouseId } },
      },
      include: {
        order: true,
        product: true,
      },
    });
  }

  async findAll(): Promise<order[]> {
    return this.db.order.findMany({
      include: {
        provider: true,
        orderDetails: true,
      },
    });
  }

  async findAllProvider(): Promise<provider[]> {
    return this.db.provider.findMany();
  }

  async findOne(id: number): Promise<order> {
    try {
      return await this.db.order.findUniqueOrThrow({
        where: { id },
        include: {
          provider: true,
          orderDetails: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<order> {
    try {
      return await this.db.order.update({
        where: { id },
        data: {
          ...updateOrderDto,
          orderDate: updateOrderDto.orderDate ? new Date(updateOrderDto.orderDate) : undefined,
        },
        include: {
          provider: true,
          orderDetails: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
  }

  async remove(id: number): Promise<order> {
    try {
      return await this.db.order.delete({
        where: { id },
        include: {
          provider: true,
          orderDetails: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
  }
}
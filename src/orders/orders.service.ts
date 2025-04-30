import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailsDto, CreateOrderDto, CreateProviderDto } from './dto/create-order.dto';
import { UpdateOrderDetailsDto, UpdateOrderDto, UpdateProviderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { order, orderDetails, provider } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly db: PrismaService) {}

  /**
   * Creates a new provider.
   * @param createProviderDto - Data Transfer Object containing provider details.
   * @returns The created provider.
   */
  async createProvider(createProviderDto: CreateProviderDto): Promise<provider> {
    return this.db.provider.create({
      data: createProviderDto,
    });
  }

  /**
   * Creates a new order.
   * @param createOrderDto - Data Transfer Object containing order details.
   * @returns The created order with its provider and order details.
   */
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

  /**
   * Creates new order details.
   * @param createOrderDetailsDto - Data Transfer Object containing order details.
   * @returns The created order details with its associated order and product.
   */
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

  /**
   * Retrieves all orders.
   * @returns A list of all orders with their providers and order details.
   */
  async findAll(): Promise<order[]> {
    return this.db.order.findMany({
      include: {
        provider: true,
        orderDetails: {
          include: {
            product: true,
            address: true,
            warehouse: true,
          },
        },
      },
    });
  }

  /**
   * Retrieves all providers.
   * @returns A list of all providers.
   */
  async findAllProvider(): Promise<provider[]> {
    return this.db.provider.findMany();
  }

  /**
   * Retrieves a specific order by ID.
   * @param id - The ID of the order.
   * @returns The order with its provider and order details.
   * @throws NotFoundException if the order is not found.
   */
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

  /**
   * Updates an order by ID.
   * @param id - The ID of the order.
   * @param updateOrderDto - Data Transfer Object containing updated order details.
   * @returns The updated order with its provider and order details.
   * @throws NotFoundException if the order is not found.
   */
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
      console.log(error);
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
  }

  /**
   * Updates order details by ID.
   * @param id - The ID of the order details.
   * @param updateOrderDetailsDto - Data Transfer Object containing updated order details.
   * @returns The updated order details with its associated order and product.
   * @throws NotFoundException if the order details are not found.
   */
  async updateOrderDetails(id: number, updateOrderDetailsDto: UpdateOrderDetailsDto): Promise<orderDetails> {
    try {
      return await this.db.orderDetails.update({
        where: { id },
        data: updateOrderDetailsDto,
        include: {
          order: true,
          product: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`OrderDetails with ID ${id} not found.`);
    }
  }

  /**
   * Updates a provider by ID.
   * @param id - The ID of the provider.
   * @param updateProviderDto - Data Transfer Object containing updated provider details.
   * @returns The updated provider.
   * @throws NotFoundException if the provider is not found.
   */
  async updateProvider(id: number, updateProviderDto: UpdateProviderDto): Promise<provider> {
    try {
      return await this.db.provider.update({
        where: { id },
        data: updateProviderDto,
      });
    } catch (error) {
      throw new NotFoundException(`Provider with ID ${id} not found.`);
    }
  }

  /**
   * Deletes an order by ID.
   * @param id - The ID of the order.
   * @returns The deleted order with its provider and order details.
   * @throws NotFoundException if the order is not found.
   */
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
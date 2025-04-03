import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeliveryDto, CreateDeliveryDetailsDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { delivery, deliveryDetails } from '@prisma/client';
import { User } from 'src/users/entity/User.entity';

@Injectable()
export class DeliveriesService {
  constructor(private readonly db: PrismaService) {}

  /**
   * Creates a new delivery.
   * @param createDeliveryDto - Data for creating the delivery.
   * @returns The created delivery.
   */
  async createDelivery(createDeliveryDto: CreateDeliveryDto): Promise<delivery> {
    const { deliveryDate, userId } = createDeliveryDto;

    const delivery =  this.db.delivery.create({
      data: {
        orderDate: new Date(deliveryDate),
        user: { connect: { id: userId } },
      }
    });
    return delivery;
  }

  /**
   * Creates delivery details for a specific delivery.
   * @param createDeliveryDetailsDto - Data for creating delivery details.
   * @returns The created delivery details.
   */
  async createDeliveryDetails(createDeliveryDetailsDto: CreateDeliveryDetailsDto): Promise<deliveryDetails> {
    return this.db.deliveryDetails.create({
      data: {
        price: createDeliveryDetailsDto.price,
        shippingCost: createDeliveryDetailsDto.shippingCost,
        OrderQuantity: createDeliveryDetailsDto.OrderQuantity,
        ExpectedDate: new Date(createDeliveryDetailsDto.ExpectedDate),
        delivery: { connect: { id: createDeliveryDetailsDto.deliveryId } },
        product: { connect: { id: createDeliveryDetailsDto.productId } },
        warehouse: { connect: { id: createDeliveryDetailsDto.warehouseId } },
        address: { connect: { id: createDeliveryDetailsDto.addressId } },
      },
      include: {
        delivery: true,
        product: true,
      },
    });
  }

  /**
   * Retrieves all deliveries with their details.
   * @returns A list of all deliveries.
   */
  async findAll(): Promise<delivery[]> {
    return this.db.delivery.findMany({
      include: {
        user: true,
        deliveryDetails: true,
      },
    });
  }

  /**
   * Retrieves a single delivery by its ID.
   * @param id - The ID of the delivery.
   * @returns The found delivery.
   * @throws NotFoundException if the delivery is not found.
   */
  async findOne(id: number): Promise<delivery> {
    try {
      return await this.db.delivery.findUniqueOrThrow({
        where: { id },
        include: {
          deliveryDetails: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Delivery with ID ${id} not found.`);
    }
  }

  /**
   * Updates a delivery by its ID.
   * @param id - The ID of the delivery.
   * @param updateDeliveryDto - Data for updating the delivery.
   * @returns The updated delivery.
   * @throws NotFoundException if the delivery is not found.
   */
  async update(id: number, updateDeliveryDto: UpdateDeliveryDto): Promise<delivery> {
    try {
      return await this.db.delivery.update({
        where: { id },
        data: {
          orderDate: updateDeliveryDto.deliveryDate
            ? new Date(updateDeliveryDto.deliveryDate)
            : undefined,
          user: updateDeliveryDto.userId
            ? { connect: { id: updateDeliveryDto.userId } }
            : undefined,
        },
        include: {
          deliveryDetails: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Delivery with ID ${id} not found.`);
    }
  }

  /**
   * Deletes a delivery by its ID.
   * @param id - The ID of the delivery.
   * @returns The deleted delivery.
   * @throws NotFoundException if the delivery is not found.
   */
  async remove(id: number): Promise<delivery> {
    try {
      return await this.db.delivery.delete({
        where: { id },
        include: {
          deliveryDetails: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Delivery with ID ${id} not found.`);
    }
  }
}
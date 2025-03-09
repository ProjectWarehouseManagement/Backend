import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { address } from '@prisma/client';

@Injectable()
export class AddressesService {
  constructor(private readonly db: PrismaService) {}

  /**
   * Creates a new address.
   * @param createAddressDto - Data transfer object for creating an address. 
   * @returns The created address.
   */
  async create(createAddressDto: CreateAddressDto): Promise<address> {
    return this.db.address.create({
      data: createAddressDto
    });
  }

  /**
   * Creates a new address with a user.
   * @param createAddressDto - Data transfer object for creating an address.
   * @param userId - The ID of the user.
   * @returns The created address.
   */
  async createWithUser(createAddressDto: CreateAddressDto, userId: number): Promise<address> {
    return this.db.address.create({
      data: {
        ...createAddressDto,
        user: {
          connect: {
            id: userId
          }
        }
      }
    });
  }

  /**
   * Creates a new address with a warehouse.
   * @param createAddressDto - Data transfer object for creating an address.
   * @param warehouseId - The ID of the warehouse.
   * @returns The created address.
   */
  async createWithWarehouse(createAddressDto: CreateAddressDto, warehouseId: number): Promise<address> {
    return this.db.address.create({
      data: {
        ...createAddressDto,
        warehouse: {
          connect: {
            id: warehouseId
          }
        }
      }
    })
  }

  /**
   * Creates a new address with an order.
   * @param createAddressDto - Data transfer object for creating an address.
   * @param orderId - The ID of the order.
   * @returns The created address.
   */
  async createWithOrderDetails(createAddressDto: CreateAddressDto, orderDetailsId: number): Promise<address> {
    return this.db.address.create({
      data: {
        ...createAddressDto,
        orderDetails: {
          connect: {
            id: orderDetailsId
          }
        }
      }
    })
  }

  /**
   * Creates a new address with a delivery.
   * @param createAddressDto - Data transfer object for creating an address.
   * @param deliveryId - The ID of the delivery.
   * @returns The created address.
   */
  async createWithDeliveryDetails(createAddressDto: CreateAddressDto, deliveryDetailsId: number): Promise<address> {
    return this.db.address.create({
      data: {
        ...createAddressDto,
        deliveryDetails: {
          connect: {
            id: deliveryDetailsId
          }
        }
      } 
    })
  }

  /**
   * Retrieves all addresses.
   * @returns An array of addresses.
   */
  async findAll(): Promise<address[]> {
    return this.db.address.findMany();
  }

  /**
   * Finds an address by ID.
   * @param id - The ID of the address.
   * @returns The found address.
   */
  async findOne(id: number): Promise<address> {
    return this.db.address.findUnique({
      where: { id }
    });
  }

  /**
   * Updates an address by ID.
   * @param id - The ID of the address.
   * @param updateAddressDto - Data transfer object for updating an address.
   * @returns The updated address.
   */
  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<address> {
    return this.db.address.update({
      where: { id },
      data: updateAddressDto
    });
  }

  /**
   * Removes an address by ID.
   * @param id - The ID of the address.
   * @returns The removed address.
   */
  async remove(id: number): Promise<address> {
    return this.db.address.delete({
      where: { id }
    });
  }
}

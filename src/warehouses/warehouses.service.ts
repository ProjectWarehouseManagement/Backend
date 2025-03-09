import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { warehouse, address } from '@prisma/client';
import { AddressesService } from 'src/addresses/addresses.service';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { UpdateAddressDto } from 'src/addresses/dto/update-address.dto';

@Injectable()
export class WarehousesService {
  constructor(private readonly db: PrismaService,
    private readonly addressService: AddressesService
  ) {}
  
  /**
   * Create a new warehouse
   * @param createWarehouseDto - Warehouse data 
   * @param addressDto - Address data
   * @returns Warehouse
   */
  async create(createWarehouseDto: CreateWarehouseDto, addressDto: CreateAddressDto): Promise<warehouse> {
    const warehouse = await this.db.warehouse.create({
      data: createWarehouseDto,
    });
    await this.addressService.createWithWarehouse(addressDto, warehouse.id);
    return warehouse;
  }

  /**
   * Find all warehouses
   * @returns List of warehouses
   * @returns Promise<warehouse[]>
   */
  async findAll(): Promise<(warehouse & { address: address })[]> {
    return this.db.warehouse.findMany({
      include: {
        address: true
      }
    });
  }

  /**
   * Find a warehouse by id
   * @param id - Warehouse id
   * @returns Warehouse
   */
  async findOne(id: number): Promise<warehouse & { address: address }> {
    return this.db.warehouse.findUnique({
      where: { id },
      include: {
        address: true
      }
    });
  }

  /**
   * Update a warehouse
   * @param id - Warehouse id
   * @param updateWarehouseDto - Warehouse data
   * @returns Warehouse
   */
  async update(id: number, updateWarehouseDto: UpdateWarehouseDto): Promise<warehouse> {
    return this.db.warehouse.update({
      where: { id },
      data: updateWarehouseDto
    });
  }

  /**
   * Update a warehouse address
   * @param id - Warehouse id
   * @param addressDto - Address data
   * @returns Warehouse
   */
  async updateAddress(id: number, addressDto: UpdateAddressDto): Promise<warehouse> {
    return this.db.warehouse.update({
      where: { id },
      data: {
        address: {
          update: addressDto
        }
      }
    });
  }

  /**
   * Remove a warehouse
   * @param id - Warehouse id
   * @returns Warehouse
   */
  async remove(id: number): Promise<warehouse> {
    return this.db.warehouse.delete({
      where: { id }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { inventory } from '@prisma/client';

@Injectable()
export class InventoriesService {
  constructor(private readonly db: PrismaService) {}

  /**
   * Creates a new inventory record.
   *
   * @param {CreateInventoryDto} createInventoryDto - The data to create the inventory.
   * @param {number} warehouseId - The ID of the warehouse to associate with the inventory.
   * @param {number} productId - The ID of the product to associate with the inventory.
   * @returns {Promise<inventory>} The created inventory record.
   * @example
   * const inventory = await inventoriesService.create(createInventoryDto, warehouseId, productId);
   */
  async create(createInventoryDto: CreateInventoryDto, warehouseId: number, productId: number): Promise<inventory> {
    return this.db.inventory.create({
      data: {
        ...createInventoryDto,
        warehouse: {
          connect: {
            id: warehouseId
          }
        },
        product: {
          connect: {
            id: productId
          }
        }
      }
    });
  }

  /**
   * Retrieves all inventory records.
   * @param {number} id - The ID of the warehouse to retrieve the inventory from.
   * @returns {Promise<inventory[]>} A list of all inventory records.
   * @example
   * const inventories = await inventoriesService.findAll(1);
   */
  async findAll(id: number): Promise<inventory[]> {
    return this.db.inventory.findMany({
      where: {
        warehouse: {
          id
        }
      }
    });
  }

  /**
   * Retrieves a specific inventory record by its ID.
   * @param {number} warehouseId - The ID of the warehouse to retrieve the inventory from.
   * @param {number} id - The ID of the inventory record to retrieve.
   * @returns {Promise<inventory>} The requested inventory record.
   * @throws {Error} If the inventory record is not found.
   * @example
   * const inventory = await inventoriesService.findOne(2, 1);
   */
  async findOne(warehouseId: number, id: number): Promise<inventory> {
    return this.db.inventory.findUniqueOrThrow({
      where: { 
        id: id,
        warehouse: {
          id: warehouseId
        }
      }
    });
  }

  /**
   * Updates a specific inventory record by its ID.
   *
   * @param {number} id - The ID of the inventory record to update.
   * @param {UpdateInventoryDto} updateInventoryDto - The data to update the inventory.
   * @returns {Promise<inventory>} The updated inventory record.
   * @example
   * const updatedInventory = await inventoriesService.update(1, updateInventoryDto);
   */
  async update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<inventory> {
    return this.db.inventory.update({
      where: { id },
      data: updateInventoryDto
    });
  }

  /**
   * Deletes a specific inventory record by its ID.
   *
   * @param {number} id - The ID of the inventory record to delete.
   * @returns {Promise<inventory>} The deleted inventory record.
   * @example
   * const deletedInventory = await inventoriesService.remove(1);
   */
  async remove(id: number): Promise<inventory> {
    return this.db.inventory.delete({
      where: { id }
    });
  }
}

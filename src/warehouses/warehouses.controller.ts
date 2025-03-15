import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { Warehouse, WarehouseWithAddress } from './entities/warehouse.entity';
import { address, inventory, Role, warehouse } from '@prisma/client';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateAddressDto } from 'src/addresses/dto/update-address.dto';
import { AddressesService } from 'src/addresses/addresses.service';
import { InventoriesService } from 'src/inventories/inventories.service';
import { CreateInventoryDto } from 'src/inventories/dto/create-inventory.dto';
import { UpdateInventoryDto } from 'src/inventories/dto/update-inventory.dto';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService,
    private readonly addressService: AddressesService,
    private readonly inventoriesService: InventoriesService
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create a new warehouse' })
  @ApiResponse({ status: 201, description: 'Warehouse created successfully', type: WarehouseWithAddress })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiParam({ name: 'createWarehouseDto', required: true, description: 'Warehouse data', type: CreateWarehouseDto })
  @ApiParam({ name: 'addressDto', required: true, description: 'Address data', type: CreateAddressDto })
  @ApiUnauthorizedResponse({ description: 'No access token' })
  @ApiHeader({
    name: 'Cookie',
    description: 'Must include access_token cookie',
  })
  async create(@Body() createWarehouseDto: CreateWarehouseDto, @Body() addressDto: CreateAddressDto): Promise<warehouse> {
    const warehouse = await this.warehousesService.create(createWarehouseDto, addressDto);
    await this.addressService.createWithWarehouse(addressDto, warehouse.id);
    return warehouse;
  }

  @Post("/inventories/:id/product/:prodId")
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  async addProductToInventory(@Param('id') id: string, @Param('prodId') prodId: string, @Body() createInventoryDto: CreateInventoryDto) : Promise<inventory> {
   return this.inventoriesService.create(createInventoryDto, +id, +prodId);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Find all warehouses' })
  @ApiResponse({ status: 200, description: 'List of warehouses', type: WarehouseWithAddress })
  @ApiUnauthorizedResponse({ description: 'No access token' })
  @ApiHeader({
    name: 'Cookie',
    description: 'Must include access_token cookie',
  })
  async findAll(): Promise<(warehouse & { address: address })[]> {
    return this.warehousesService.findAll();
  }

  @Get(':id/inventories')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  async findAllInventories(@Param('id') id: string): Promise<inventory[]> {
    return this.inventoriesService.findAll(+id);
  }

  @Get(':warehouseId/inventories/:inventoryId')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  async findOneInventory(@Param('warehouseId') id: string, @Param('inventoryId') invId: string): Promise<inventory> {
    return this.inventoriesService.findOne(+id, +invId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Find a warehouse by id' })
  @ApiResponse({ status: 200, description: 'Warehouse found', type: WarehouseWithAddress })
  @ApiResponse({ status: 404, description: 'Warehouse not found' })
  @ApiParam({ name: 'id', required: true, description: 'Warehouse id' })
  @ApiUnauthorizedResponse({ description: 'No access token' })
  @ApiHeader({
    name: 'Cookie',
    description: 'Must include access_token cookie',
  })
  async findOne(@Param('id') id: string): Promise<warehouse & { address: address }> {
    return this.warehousesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update a warehouse' })
  @ApiResponse({ status: 200, description: 'Warehouse updated successfully', type: Warehouse })
  @ApiResponse({ status: 404, description: 'Warehouse not found' })
  @ApiParam({ name: 'id', required: true, description: 'Warehouse id' })
  @ApiParam({ name: 'updateWarehouseDto', required: true, description: 'Warehouse data', type: UpdateWarehouseDto })
  @ApiUnauthorizedResponse({ description: 'No access token' })
  @ApiHeader({
    name: 'Cookie',
    description: 'Must include access_token cookie',
  })
  async update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto): Promise<warehouse> {
    return this.warehousesService.update(+id, updateWarehouseDto);
  }

  @Patch('/inventories/:id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  async updateInventory(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto): Promise<inventory> {
    return this.inventoriesService.update(+id, updateInventoryDto);
  }

  @Post(':id/address')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update a warehouse address' })
  @ApiResponse({ status: 200, description: 'Warehouse address updated successfully', type: Warehouse })
  @ApiResponse({ status: 404, description: 'Warehouse not found' }) 
  @ApiParam({ name: 'id', required: true, description: 'Warehouse id' })
  @ApiParam({ name: 'addressDto', required: true, description: 'Address data', type: UpdateAddressDto })
  @ApiUnauthorizedResponse({ description: 'No access token' })
  @ApiHeader({
    name: 'Cookie',
    description: 'Must include access_token cookie',
  })
  async updateAddress(@Param('id') id: string, @Body() addressDto: CreateAddressDto): Promise<warehouse> {
    return this.warehousesService.updateAddress(+id, addressDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Remove a warehouse' })
  @ApiResponse({ status: 200, description: 'Warehouse removed successfully', type: Warehouse })
  @ApiResponse({ status: 404, description: 'Warehouse not found' })
  @ApiParam({ name: 'id', required: true, description: 'Warehouse id' })
  @ApiUnauthorizedResponse({ description: 'No access token' })
  @ApiHeader({
    name: 'Cookie',
    description: 'Must include access_token cookie',
  })
  async remove(@Param('id') id: string): Promise<warehouse> {
    return this.warehousesService.remove(+id);
  }

  @Delete('/inventories/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async removeInventory(@Param('id') id: string): Promise<inventory> {
    return this.inventoriesService.remove(+id);
  }
}

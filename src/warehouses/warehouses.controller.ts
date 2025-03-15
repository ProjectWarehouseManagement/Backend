import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { Warehouse, WarehouseWithAddress } from './entities/warehouse.entity';
import { address, Role, warehouse } from '@prisma/client';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateAddressDto } from 'src/addresses/dto/update-address.dto';
import { AddressesService } from 'src/addresses/addresses.service';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService,
    private readonly addressService: AddressesService
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
}

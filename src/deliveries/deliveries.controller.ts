import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto, CreateDeliveryDetailsDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDetailsDto, UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}


  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new delivery' })
  @ApiResponse({ status: 201, description: 'Delivery created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.createDelivery(createDeliveryDto);
  }

  @Post('details')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create delivery details' })
  @ApiResponse({ status: 201, description: 'Delivery details created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createDeliveryDetails(@Body() createDeliveryDetailsDto: CreateDeliveryDetailsDto) {
    return this.deliveriesService.createDeliveryDetails(createDeliveryDetailsDto);
  }


  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve all deliveries' })
  @ApiResponse({ status: 200, description: 'List of deliveries retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.deliveriesService.findAll();
  }


  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve a delivery by ID' })
  @ApiResponse({ status: 200, description: 'Delivery retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  findOne(@Param('id') id: string) {
    return this.deliveriesService.findOne(+id);
  }


  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a delivery by ID' })
  @ApiResponse({ status: 200, description: 'Delivery updated successfully.' })
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveriesService.update(+id, updateDeliveryDto);
  }


  @Patch('details/:id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update delivery details by ID' })
  @ApiResponse({ status: 200, description: 'Delivery details updated successfully.' })
  @ApiResponse({ status: 404, description: 'Delivery details not found.' })
  updateDetails(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDetailsDto) {
    return this.deliveriesService.updateDetails(+id, updateDeliveryDto);
  }


  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a delivery by ID' })
  @ApiResponse({ status: 200, description: 'Delivery deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Delivery not found.' })
  remove(@Param('id') id: string) {
    return this.deliveriesService.remove(+id);
  }
}
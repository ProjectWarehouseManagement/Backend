import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto, CreateDeliveryDetailsDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDetailsDto, UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  /**
   * Endpoint to create a new delivery.
   * @param createDeliveryDto - Data for creating the delivery.
   * @returns The created delivery.
   */
  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.createDelivery(createDeliveryDto);
  }

  /**
   * Endpoint to create delivery details.
   * @param createDeliveryDetailsDto - Data for creating delivery details.
   * @returns The created delivery details.
   */
  @Post('details')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  createDeliveryDetails(@Body() createDeliveryDetailsDto: CreateDeliveryDetailsDto) {
    return this.deliveriesService.createDeliveryDetails(createDeliveryDetailsDto);
  }

  /**
   * Endpoint to retrieve all deliveries.
   * @returns A list of all deliveries.
   */
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.deliveriesService.findAll();
  }

  /**
   * Endpoint to retrieve a single delivery by its ID.
   * @param id - The ID of the delivery.
   * @returns The found delivery.
   */
  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.deliveriesService.findOne(+id);
  }

  /**
   * Endpoint to update a delivery by its ID.
   * @param id - The ID of the delivery.
   * @param updateDeliveryDto - Data for updating the delivery.
   * @returns The updated delivery.
   */
  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveriesService.update(+id, updateDeliveryDto);
  }

  @Patch('details/:id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  updateDetails(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDetailsDto) {
    return this.deliveriesService.updateDetails(+id, updateDeliveryDto);
  }

  /**
   * Endpoint to delete a delivery by its ID.
   * @param id - The ID of the delivery.
   * @returns The deleted delivery.
   */
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.deliveriesService.remove(+id);
  }
}
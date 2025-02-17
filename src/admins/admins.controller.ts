import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { admin } from '@prisma/client';
import { Admin } from './entities/admin.entity';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiOperation({summary: 'Create a new Admin.'})
  @ApiResponse({ status: 201, description: 'The Admin has been successfully created.', type: Admin})
  @ApiResponse({status: 400, description: 'Bad Request.'})
  @ApiBody({ type: CreateAdminDto })
  async create(@Body() createAdminDto: CreateAdminDto): Promise<admin> {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all admin user.'})
  @ApiResponse({ status: 200, description: 'The admin users have been successfully retrieved.', type: [Admin]})
  async findAll(): Promise<admin[]> {
    return this.adminsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Find one admin user.'})
  @ApiResponse({ status: 200, description: 'The admin user have been successfully retrieved.', type: Admin})
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBody({ type: CreateAdminDto })
  async findOne(@Param('id') id: string): Promise<admin> {
    return this.adminsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update an admin user.'})
  @ApiResponse({ status: 200, description: 'The Admin has been successfully updated.', type: Admin})
  @ApiResponse({status: 400, description: 'Bad Request.'})
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBody({ type: CreateAdminDto })
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto): Promise<admin> {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete an admin user.'})
  @ApiResponse({ status: 200, description: 'The Admin has been successfully deleted.', type: Admin})
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBody({ type: CreateAdminDto })
  async remove(@Param('id') id: string): Promise<admin> {
    return this.adminsService.remove(+id);
  }
}
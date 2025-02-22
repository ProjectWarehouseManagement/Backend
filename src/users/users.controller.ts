import { Body, Controller, Get, Post, Patch, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role, user } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<user>{
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('bearer'), RolesGuard)
  async findAll(): Promise<user[]> {
    return this.usersService.findAll();
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('bearer'), RolesGuard)
  async findOne(@Param('id') id: string): Promise<user> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuard('bearer'), RolesGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<user> {
    return this.usersService.update(+id, updateUserDto);
  }
}

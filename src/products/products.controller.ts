import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { product, Role } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('bearer'), RolesGuard)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.', type: Product })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateProductDto })  
  async create(@Body() createProductDto: CreateProductDto): Promise<product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuard('bearer'), RolesGuard)
  @ApiOperation({ summary: 'Retrieve all product' })
  @ApiResponse({ status: 200, description: 'The products have been successfully retrieved.', type: [Product] })
  async findAll(): Promise<product[]> {
    return this.productsService.findAll();
  }



  @Get(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuard('bearer'), RolesGuard)
  @ApiOperation({ summary: 'Retrieve a single product by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the product.', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the product' })
  async findOne(@Param('id') id: string): Promise<product> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('bearer'), RolesGuard)
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the product' })
  @ApiBody({ type: UpdateProductDto, required: false })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<product> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('bearer'), RolesGuard)
  @ApiOperation({ summary: 'Remove a product' })
  @ApiResponse({ status: 204, description: 'The product has been successfully removed.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the product' })
  remove(@Param('id') id: string) : Promise<product> {
    return this.productsService.remove(+id);
  }
}

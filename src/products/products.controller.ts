import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { product, Role } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.', type: Product })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: CreateProductDto })  
  async create(@Body() createProductDto: CreateProductDto): Promise<product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve all product' })
  @ApiResponse({ status: 200, description: 'The products have been successfully retrieved.', type: [Product] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(): Promise<product[]> {
    return this.productsService.findAll();
  }

  @Get('byBarcode')
  @ApiOperation({ summary: 'Find products by barcode' })
  @ApiQuery({ name: 'barcode', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Products found' })
  @ApiResponse({ status: 404, description: 'No products found' })
  async findByBarcode(@Query('barcode') barcode: string) {
    const products = await this.productsService.findByBarcode(barcode);
    if (!products) {
      throw new NotFoundException('No product found with the given barcode.');
    }
    return products;
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve a single product by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the product.', type: Product })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the product' })
  async findOne(@Param('id') id: string): Promise<product> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.', type: Product })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the product' })
  @ApiBody({ type: UpdateProductDto, required: false })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<product> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove a product' })
  @ApiResponse({ status: 204, description: 'The product has been successfully removed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the product' })
  remove(@Param('id') id: string) : Promise<product> {
    return this.productsService.remove(+id);
  }
}

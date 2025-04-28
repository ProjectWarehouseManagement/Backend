import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateDeliveryDetailsDto {
  @ApiProperty({
    description: 'Price of the product in the delivery',
    example: 100.5,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Shipping cost for the delivery',
    example: 15.99,
  })
  @IsNumber()
  @IsPositive()
  shippingCost: number;

  @ApiProperty({
    description: 'Quantity of the product in the delivery',
    example: 10,
  })
  @IsNumber()
  @IsPositive()
  OrderQuantity: number;

  @ApiProperty({
    description: 'Expected delivery date',
    example: '2025-04-10',
  })
  @IsDateString()
  ExpectedDate: string | Date;

  @ApiProperty({
    description: 'ID of the product being delivered',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  productId: number;

  @ApiProperty({
    description: 'ID of the warehouse from which the product is delivered',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  warehouseId: number;

  @ApiProperty({
    description: 'ID of the address where the product is delivered',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  addressId: number;

    @ApiProperty({
        description: 'ID of the delivery to which these details belong',
        example: 1,
    })
    @IsNumber()
    @IsPositive()
    deliveryId: number;
}

export class CreateDeliveryDto {
  @ApiProperty({
    description: 'Date of the delivery',
    example: '2025-04-03',
  })
  @IsDateString()
  deliveryDate: string | Date;
}
import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsDateString, IsNotEmpty, IsNumber, IsPhoneNumber, IsPositive, IsString } from "class-validator";

export class CreateOrderDetailsDto {
    @ApiProperty({
        description: "Price of the product",
        example: 1,
    })
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({
        description: "Shipping cost of the product",
        example: 5.99,
    })
    @IsNumber()
    @IsPositive()
    shippingCost: number;

    @ApiProperty({
        description: "Quantity of the product",
        example: 10,
    })
    @IsNumber()
    @IsPositive()
    OrderQuantity: number;

    @ApiProperty({
        description: "Expected date of delivery",
        example: "2023-10-01",
    })
    @IsDateString()
    ExpectedDate: string | Date;
    
    @ApiProperty({
        description: "ID of the product",
        example: 1,
        required: true,
    })
    @IsNumber()
    @IsPositive()
    productId: number;
    
    @ApiProperty({
        description: "ID of the address",
        example: 1,
        required: true,
    })
    @IsNumber()
    @IsPositive()
    addressId: number;
    
    @ApiProperty({
        description: "ID of the warehouse",
        example: 1,
        required: true,
    })
    @IsNumber()
    @IsPositive()
    warehouseId: number;
    
    @ApiProperty({
        description: "ID of the order",
        example: 1,
        required: true,
    })
    @IsNumber()
    @IsPositive()
    orderId: number;
}

export class CreateProviderDto implements Prisma.providerCreateInput {
    @ApiProperty({
        description: "Name of the provider",
        example: "Provider Name",
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "E-mail of the provider",
        example: "example@example.com",
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: "Phone number of the provider",
        example: "+1234567890",
    })
    @IsString()
    @IsPhoneNumber()
    phone: string;
}

export class CreateOrderDto {
    @ApiProperty({
        description: "Date of the order",
        example: "2023-10-01",
    })
    @IsDateString()
    orderDate: string | Date;

    @ApiProperty()
    providerId:number
}
import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto implements Prisma.productCreateInput{
    @ApiProperty({
        description: 'The name of the product.',
        example: 'Kávéfőző'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The barcode of the product.',
        example: '5991234567890'
    })
    @IsString()
    barcode: string;

    @ApiProperty({
        description: 'The unit price of the product. (EUR)',
        example: 150
    })
    @IsInt()
    @Min(0)
    unitPrice: number;

    @ApiProperty({
        description: 'The width of the product\'s box. (mm)',
        example: 250
    })
    @IsNumber()
    @Min(0)
    width: number;

    @ApiProperty({
        description: 'The height of the product\'s box. (mm)',
        example: 350
    })
    @IsNumber()
    @Min(0)
    height: number;

    @ApiProperty({
        description: 'The depth of the product\'s box. (mm)',
        example: 300
    })
    @IsNumber()
    @Min(0)
    depth: number;

    @ApiProperty({
        description: 'The weight of the product. (g)',
        example: 3000
    })
    @IsNumber()
    @Min(0)
    Weight: number;

    @ApiProperty({
        description: 'The product has an expiration date. (True/False)',
        example: false
    })
    @IsBoolean()
    Expiration: boolean;
    @ApiProperty({
        description: 'The product expiration date.',
        example: '2025-02-14'
    })
    ExpirationDate?: Date;
}

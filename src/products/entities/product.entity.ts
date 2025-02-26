import { ApiProperty } from "@nestjs/swagger";
import { product } from "@prisma/client";

export class Product implements product{
    id: number;
    @ApiProperty({
        description: 'The name of the product.',
        example: 'Kávéfőző'
    })
    name: string;
    @ApiProperty({
        description: 'The barcode of the product.',
        example: '5991234567890'
    })
    barcode: string;
    @ApiProperty({
        description: 'The unit price of the product. (EUR)',
        example: 150
    })
    unitPrice: number;
    @ApiProperty({
        description: 'The width of the product\'s box. (mm)',
        example: 250
    })
    width: number;
    @ApiProperty({
        description: 'The height of the product\'s box. (mm)',
        example: 350
    })
    height: number;
    @ApiProperty({
        description: 'The depth of the product\'s box. (mm)',
        example: 300
    })
    depth: number;
    @ApiProperty({
        description: 'The weight of the product. (g)',
        example: 3000
    })
    Weight: number;
    @ApiProperty({
        description: 'The product has an expiration date. (True/False)',
        example: false
    })
    Expiration: boolean;
    @ApiProperty({
        description: 'The product expiration date.',
        example: '2025-02-14'
    })
    ExpirationDate: Date;
}

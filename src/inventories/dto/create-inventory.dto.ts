import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsBoolean, IsNumber, Min } from "class-validator";
import { Product } from "src/products/entities/product.entity";
import { Warehouse } from "src/warehouses/entities/warehouse.entity";

export class CreateInventoryDto implements Omit<Prisma.inventoryCreateInput, 'product' | 'warehouse'> {
    @ApiProperty({
            description: 'The quantity of product.',
            example: 50,
            type: "number"
        })
    @IsNumber()
    @Min(0)
    quantity: number;

    @ApiProperty({
        description: 'If the product is available.',
        example: true,
        type: "boolean"
    })
    @IsBoolean()
    available: boolean;

    @ApiProperty({
        description: 'At what point the product should be re-ordered.',
        example: 10,
        type: "number"
    })
    @IsNumber()
    @Min(0)
    reorderPoint: number;
}

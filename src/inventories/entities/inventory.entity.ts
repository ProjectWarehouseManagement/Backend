import { ApiProperty } from "@nestjs/swagger";
import { inventory } from "@prisma/client";

export class Inventory implements inventory {
    @ApiProperty({ example: 1, description: 'Unique identifier of the inventory' })
    id: number;

    @ApiProperty({ example: 20, description: 'The quantity of product in inventory' })
    quantity: number;

    @ApiProperty({ example: true, description: 'If the product is available in inventory' })
    available: boolean;

    @ApiProperty({ example: 10, description: 'At what point you should re-order the product.' })
    reorderPoint: number;

    @ApiProperty({ example: 2, description: 'Unique identifier of the product in inventory' })
    productId: number;

    @ApiProperty({ example: 3, description: 'Unique identifier of the warehouse the inventory is in.' })
    warehouseId: number;
}

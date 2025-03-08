import { ApiProperty } from "@nestjs/swagger";
import { Prisma, PrismaClient } from "@prisma/client";
import { IsBoolean } from "class-validator";

export class CreateWarehouseDto implements Prisma.warehouseCreateInput {
    @ApiProperty({
        example: true,
        description: "Warehouse's capacity status",
        format: "boolean",
        })
    @IsBoolean()
    capacity: boolean;

    @ApiProperty({
        example: "Warehouse A",
        description: "Warehouse's name",
        format: "string",
        })
    address: Prisma.addressCreateNestedOneWithoutWarehouseInput;
}

import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsBoolean } from "class-validator";
import { Address } from "src/addresses/entities/address.entity";

export class CreateWarehouseDto implements Prisma.warehouseCreateInput {
    @ApiProperty({
        example: true,
        description: "Warehouse's capacity status",
        format: "boolean",
        })
    @IsBoolean()
    capacity: boolean;

    @ApiProperty({
        example: "A",
        description: "Name of the warehouse",
        format: "string",
    })
    name: string;

    @ApiProperty({
        example: Address,
        description: "Warehouse's address",
        format: "Address",
        })
    address: Prisma.addressCreateNestedOneWithoutWarehouseInput;
}

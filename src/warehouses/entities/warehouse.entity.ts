import { ApiProperty } from "@nestjs/swagger";
import { warehouse } from "@prisma/client";
import { Address } from "src/addresses/entities/address.entity";

export class Warehouse implements warehouse {
    @ApiProperty({ example: 1, description: 'Unique identifier of the warehouse' })
    id: number;

    @ApiProperty({ example: 100, description: 'Capacity of the warehouse' })
    capacity: boolean;

    @ApiProperty({ example: 1, description: 'Address id of the warehouse' })
    addressId: number;
}

export class WarehouseWithAddress extends Warehouse {
    @ApiProperty({ description: 'Address details' })
    addressDetails: Address;
}

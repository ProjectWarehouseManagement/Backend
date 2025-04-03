import { ApiProperty } from "@nestjs/swagger";
import { address } from "@prisma/client";

export class Address implements address {
    @ApiProperty({ example: 1, description: 'Unique identifier of the address' })
    id: number;

    @ApiProperty({ example: '123 Main St', description: 'Street address' })
    street: string;

    @ApiProperty({ example: 'Anytown', description: 'City' })
    city: string;

    @ApiProperty({ example: 'CA', description: 'State' })
    state: string;

    @ApiProperty({ example: '90210', description: 'Postal code' })
    postalCode: string;

    @ApiProperty({ example: 'United States', description: 'Country' })
    country: string;

    @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
    userId: number;
}

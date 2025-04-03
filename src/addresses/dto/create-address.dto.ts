import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto implements Prisma.addressCreateInput{
    @ApiProperty({
        example: "123 Main St",
        description: "Street address",
        format: "string",
      })
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty({
        example: "Anytown",
        description: "City",
        format: "string",
      })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({
        example: "CA",
        description: "State",
        format: "string",
      })
    @IsString()
    state: string;

    @ApiProperty({
        example: "90210",
        description: "Postal code",
        format: "string",
      })
    @IsInt()
    postalCode: string;

    @ApiProperty({
        example: "United States",
        description: "Country",
        format: "string",
      })
    @IsString()
    @IsNotEmpty()
    country: string;
}

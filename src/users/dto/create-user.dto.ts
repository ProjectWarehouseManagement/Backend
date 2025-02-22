import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsEmail, IsStrongPassword } from "class-validator";


export class CreateUserDto implements Prisma.userCreateInput{
    @ApiProperty({
        example: "user@example.com",
        description: "User's email address",
        format: "email",
      })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "P@ssw0rd123!",
        description: "User's password (must be strong)",
        format: "password",
      })
    @IsStrongPassword()
    password: string;
}
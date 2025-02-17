import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"

export class CreateAdminDto implements Prisma.adminCreateInput {
    @ApiProperty({
        description: 'User full name',
        example: 'Nagy Gergő',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        format: 'email',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'User phone number in international format',
        example: '+14155552671',
        format: 'phone',
    })
    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({
        description: 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
        example: 'Str0ngP@ss!',
        pattern: '^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&*()_+\-={}:;"\'<>,.?/]).{8,}$'
    })
    @IsStrongPassword()
    password: string;
}

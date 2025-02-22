import { Prisma } from "@prisma/client";
import { IsEmail, IsStrongPassword } from "class-validator";


export class CreateUserDto implements Prisma.userCreateInput{
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;
}
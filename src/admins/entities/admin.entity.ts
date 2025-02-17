import { ApiProperty } from "@nestjs/swagger";
import { admin } from "@prisma/client";

export class Admin implements admin{
    
    @ApiProperty({
        description: 'Name of Admin',
        example: 'Nagy Gergő'
    })
    name: string;

    @ApiProperty({
        description: 'ID of the Admin',
        example: 2
    })
    id: number;

    @ApiProperty({
        description: 'The Admin\'s email address',
        example: 'admin@example.com'
    })
    email: string;

    @ApiProperty({
        description: 'The Admin\'s phone number',
        example: '+36207544489'
    })
    phoneNumber: string;

    @ApiProperty({
        description: 'The Admin\'s password',
        example: 'Admins1!'
    })
    password: string;
}
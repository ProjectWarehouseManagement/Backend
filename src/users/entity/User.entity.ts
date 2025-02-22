
import { ApiProperty } from '@nestjs/swagger';
import { $Enums, user } from '@prisma/client';

export class User implements Omit<user, 'password'>{
    @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
    id: number;

    @ApiProperty({ example: 'user@example.com', description: 'Email address of the user' })
    email: string;

    @ApiProperty({ example: $Enums.Role.CUSTOMER, enum: $Enums.Role, description: 'Role of the user' })
    role: $Enums.Role;

    @ApiProperty({ example: 'John', description: 'First name of the user' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
    lastName: string;

    @ApiProperty({ example: '+1234567890', description: 'Phone number of the user' })
    phoneNumber: string;

    @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Date when the user was created' })
    createdAt: Date;

    @ApiProperty({ example: '2023-01-02T00:00:00.000Z', description: 'Date when the user was last updated' })
    updatedAt: Date;
}

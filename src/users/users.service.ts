import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private db: PrismaService){}

    /**
     * Creates a new user.
     * @param {CreateUserDto} createUserDto - Data transfer object for creating a user.
     * @returns {Promise<user>} - The created user without the password field.
     */
    async create(createUserDto: CreateUserDto): Promise<user>{
        const hashedPw = await hash(createUserDto.password);
        const newUser = await this.db.user.create({
            data: {
                ...createUserDto,
                password: hashedPw
            }
        })
        delete newUser.password;
        return newUser;
    }

    /**
     * Retrieves all users.
     * @returns {Promise<user[]>} - An array of users without password fields.
     */
    async findAll(): Promise<user[]> {
        const users = await this.db.user.findMany();
        users.map(user => delete user.password);
        return users;
    }

    /**
     * Finds a user by ID.
     * @param {number} id - The ID of the user.
     * @returns {Promise<user>} - The found user without the password field.
     * @throws {PrismaClientKnownRequestError} - If the user is not found.
     */
    async findOne(id: number): Promise<user> {
        const user = await this.db.user.findUniqueOrThrow({
            where: { id }
        })
        delete user.password;
        return user;
    }

    /**
     * Updates a user by ID.
     * @param {number} id - The ID of the user.
     * @param {UpdateUserDto} updateUserDto - Data transfer object for updating a user.
     * @returns {Promise<user>} - The updated user without the password field.
     */
    async update(id: number, updateUserDto: UpdateUserDto): Promise<user>{
        if(updateUserDto.password){
            const hashedPw = await hash(updateUserDto.password);
            const updatedUser = await this.db.user.update({
                where: { id },
                data: {
                    ...updateUserDto,
                    password: hashedPw
                }
            })
            delete updatedUser.password;
            return updatedUser;
        }else{
            const updatedUser = await this.db.user.update({
                where: { id },
                data: {
                    ...updateUserDto
                }
            })
            delete updatedUser.password;
            return updatedUser;
        }
    }
}

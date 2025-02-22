import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private db: PrismaService){}

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

    async findAll(): Promise<user[]> {
        const users = await this.db.user.findMany();
        users.map(user => delete user.password);
        return users;
    }

    async findOne(id: number): Promise<user> {
        const user = await this.db.user.findUniqueOrThrow({
            where: { id }
        })
        delete user.password;
        return user;
    }

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

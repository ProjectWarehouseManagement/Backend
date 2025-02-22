import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { verify } from 'argon2';
import { randomBytes } from 'node:crypto';
import { token } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(private db: PrismaService) { }

  async login(loginDto: LoginDto): Promise<token> {
    const user = await this.db.user.findUniqueOrThrow({
      where: {
        email: loginDto.email
      }
    });
    if (await verify(user.password, loginDto.password)) {
      return this.db.token.create({
        data: {
          token: randomBytes(32).toString('hex'),
          user: { connect: { id: user.id } },
        }
      })
    } else {
      throw new Error('Invalid pass');
    }
  }

  async logout(userId: number) {
    const result = await this.db.token.deleteMany({
      where: {
        userId: userId
      }
    });
  }
}

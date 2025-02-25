import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwtService: JwtService) { }

  async login(loginDto: LoginDto): Promise<{ access_token: string}> {
    const user = await this.db.user.findUniqueOrThrow({
      where: {
        email: loginDto.email
      }
    });
    if (await verify(user.password, loginDto.password)) {
      const payload = { sub: user.id, email: user.email, role: user.role };
      return {
        access_token: await this.jwtService.signAsync(payload)
      };
    } else {
      throw new Error('Invalid pass');
    }
  }
}

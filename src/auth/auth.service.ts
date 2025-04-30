import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  /**
   * Constructor for AuthService
   * @param db - PrismaService instance for database operations
   * @param jwtService - JwtService instance for handling JWT tokens
   */
  constructor(private db: PrismaService, private jwtService: JwtService) { }

  /**
   * Handles user login by verifying credentials and returning a payload.
   * @param loginDto - Data Transfer Object containing email and password
   * @returns A payload containing user ID, email, and role
   * @throws Error if the password is invalid
   */
  async login(loginDto: LoginDto): Promise<{ sub: number, email: string, role: string }> {
    const user = await this.db.user.findUniqueOrThrow({
      where: {
        email: loginDto.email
      }
    });
    if (await verify(user.password, loginDto.password)) {
      const payload = { sub: user.id, email: user.email, role: user.role };
      return payload;
    } else {
      throw new Error('Invalid pass');
    }
  }

  /**
   * Generates access and refresh tokens for a given payload.
   * @param payload - The payload to encode in the tokens
   * @returns An object containing the access and refresh tokens
   */
  async generateTokens(payload: any): Promise<{ access_token: string, refresh_token: string }> {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload);
    return { access_token, refresh_token };
  }

  /**
   * Validates a given JWT token.
   * @param token - The JWT token to validate
   * @returns The decoded token payload if valid
   * @throws Error if the token is invalid or expired
   */
  async validateToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }
}

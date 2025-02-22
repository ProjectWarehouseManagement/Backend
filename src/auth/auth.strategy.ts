import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";
import { PrismaService } from "src/prisma/prisma.service";
import { user } from "@prisma/client";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor (private db: PrismaService) {
    super();
  }

  async validate(token: string): Promise<user> {
    const tokenObj = await this.db.token.findUnique({
      where: { token }
    })
    if (!tokenObj) {
      throw new ForbiddenException('Invalid token');
    }
    const user = await this.db.user.findUniqueOrThrow({
      where: { id: tokenObj.userId }
    })
    return user;
  }
}

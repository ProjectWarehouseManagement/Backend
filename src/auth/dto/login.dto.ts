import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
          example: "user@example.com",
          description: "User's email address",
          format: "email",
        })
  @IsString()
  email: string;
  
  @ApiProperty({
    example: "P@ssw0rd123!",
    description: "User's password (must be strong)",
    format: "password",
  })
  @IsString()
  password: string;
}
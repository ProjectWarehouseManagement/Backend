import { Body, Controller, Delete, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Roles } from './roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { RolesGuard } from './roles.guard';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully', type: Object })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.login(loginDto);
      return user;
    } catch (e) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  @Delete('logout')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuard('bearer'), RolesGuard)
  @ApiOperation({ summary: 'User logout' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Logged out successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard('bearer'), RolesGuard)
  async logout(@Req() req, @Res() res) {
    const userId = req.user.id;
    console.log(userId);
    await this.authService.logout(+userId);

    return res.send({ message: 'Logged out successfully' });
  }
}

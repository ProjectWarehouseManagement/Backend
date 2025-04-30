import { Body, Controller, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from './guards/roles.guard';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Logged in successfully', type: Object })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  @ApiHeader({
    name: 'Cookie',
    description: 'Stores access_token and refresh_token in cookies',
  })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    let payload;
    try {
      payload = await this.authService.login(loginDto);
    } catch (e) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const { access_token, refresh_token } = await this.authService.generateTokens(payload);

    res.cookie('access_token', access_token, { httpOnly: true, secure: true, sameSite: 'lax' });
    res.cookie('refresh_token', refresh_token, { httpOnly: true, secure: true, sameSite: 'lax' });
    return res.send({ message: 'Logged in successfully' });
  }

  @Post('logout')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Logged out successfully', type: Object })
  @ApiUnauthorizedResponse({ description: 'No access token' })
  @ApiUnauthorizedResponse({ description: 'No refresh token' })
  @ApiHeader({
    name: 'Cookie',
    description: 'Must include access_token and refresh_token cookies',
  })
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.send({ message: 'Logged out successfully' });
  }

  @Post('refresh')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token using refresh token cookie' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  @ApiUnauthorizedResponse({ description: 'No refresh token' })
  @ApiHeader({
    name: 'Cookie',
    description: 'Must include refresh_token cookie',
  })
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refresh_token = req.cookies?.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException('No refresh token');
    }

    let payload;
    try {
      payload = await this.authService.validateToken(refresh_token);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    delete payload.iat;
    delete payload.exp;

    const { access_token, refresh_token: new_refresh_token } = await this.authService.generateTokens(payload);
    res.cookie('access_token', access_token);
    res.cookie('refresh_token', new_refresh_token);
    return res.send({ message: 'Tokens refreshed' });
  }

  @Post('check')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Access token is valid' })
  @ApiResponse({ status: 401, description: 'Invalid access token' })
  @ApiUnauthorizedResponse({ description: 'No access token' })
  @ApiHeader({
    name: 'Cookie',
    description: 'Must include access_token cookie',
  })
  async check(@Req() req: Request, @Res() res: Response) {
    const access_token = req.cookies?.access_token;
    if (!access_token) {
      throw new UnauthorizedException('No access token');
    }

    let payload;
    try {
      payload = await this.authService.validateToken(access_token);
    } catch (e) {
      throw new UnauthorizedException('Invalid access token');
    }
    delete payload.iat;
    delete payload.exp;

    return res.send({ message: 'Access token is valid', user: payload });
  }
}

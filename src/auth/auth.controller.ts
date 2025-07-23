import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginResponseDto } from './login-response.dto';
import { LoginDto, UserDto } from './login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login de usuario' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
    type: LoginResponseDto,
  })
  async login(@Body() body: LoginDto, @Res() res: Response): Promise<void> {
    const valid = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (valid) {
      const { access_token } = this.authService.login(body.username);
      res.cookie('session', access_token, { httpOnly: true });
      res.json({ access_token, success: true });
      return;
    }
    res.status(401).json({ success: false });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Obtener el usuario logueado' })
  @ApiResponse({
    status: 200,
    description: 'Usuario logueado',
  })
  getProfile(@Request() req: { user: UserDto }): UserDto {
    return req.user;
  }

  @Delete('me')
  @ApiOperation({ summary: 'Cerrar sesión del usuario' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada correctamente' })
  logout(@Res() res: Response): void {
    res.clearCookie('session');
    res.json({ success: true });
  }
}

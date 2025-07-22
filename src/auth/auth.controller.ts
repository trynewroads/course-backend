import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './login-response.dto';
import { LoginDto } from './login.dto';

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
  login(@Body() body: LoginDto): LoginResponseDto {
    const valid = this.authService.validateUser(body.username, body.password);
    if (valid) {
      return {
        access_token: this.authService.login(body.username).access_token,
        success: true,
      };
    }
    return { success: false };
  }
}

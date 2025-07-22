import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users: Array<{ username: string; password: string }>;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.users = [
      {
        username: this.configService.get<string>('defaultUser')!,
        password: this.configService.get<string>('defaultPass')!,
      },
    ];
  }

  validateUser(username: string, password: string): boolean {
    return this.users.some(
      (user: { username: string; password: string }) =>
        user.username === username && user.password === password,
    );
  }

  login(username: string): { access_token: string } {
    const payload = { username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

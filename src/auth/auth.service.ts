import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users = [
    {
      username: process.env.DEFAULT_USER || 'admin',
      password: process.env.DEFAULT_PASS || '12345678',
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  validateUser(username: string, password: string): boolean {
    return this.users.some(
      (user) => user.username === username && user.password === password,
    );
  }

  login(username: string): { access_token: string } {
    const payload = { username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

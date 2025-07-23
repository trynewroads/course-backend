import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiConfigService } from '../config/api-config.service';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private readonly users: Array<{ username: string; password: string }>;

  constructor(
    private readonly jwtService: JwtService,
    private readonly apiConfig: ApiConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    this.users = [
      {
        username: this.apiConfig.defaultUser,
        password: this.apiConfig.defaultPass,
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

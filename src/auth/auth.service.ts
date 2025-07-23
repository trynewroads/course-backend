import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiConfigService } from '../config/api-config.service';
import { User } from './user.entity';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly jwtService: JwtService,
    private readonly apiConfig: ApiConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.ensureDefaultUser();
  }

  private async ensureDefaultUser() {
    const exists = await this.userRepository.exists({
      where: { username: this.apiConfig.defaultUser },
    });
    if (!exists) {
      const user = this.userRepository.create({
        username: this.apiConfig.defaultUser,
        password: this.apiConfig.defaultPass,
      });
      await this.userRepository.save(user);
    }
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ username, password });
    return !!user;
  }

  login(username: string): { access_token: string } {
    const payload = { username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

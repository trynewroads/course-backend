import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT')!;
  }

  get defaultUser(): string {
    return this.configService.get<string>('DEFAULT_USER')!;
  }

  get defaultPass(): string {
    return this.configService.get<string>('DEFAULT_PASS')!;
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET')!;
  }

  get enableAuth(): boolean {
    return this.configService.get<boolean>('ENABLE_AUTH')!;
  }

  get useDb(): boolean {
    return this.configService.get<boolean>('USE_DB')!;
  }

  get dbHost(): string {
    return this.configService.get<string>('DB_HOST')!;
  }

  get dbPort(): number {
    return this.configService.get<number>('DB_PORT')!;
  }

  get dbUser(): string {
    return this.configService.get<string>('DB_USER')!;
  }

  get dbPass(): string {
    return this.configService.get<string>('DB_PASS')!;
  }

  get dbName(): string {
    return this.configService.get<string>('DB_NAME')!;
  }
}

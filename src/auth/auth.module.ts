import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService } from 'src/config/api-config.service';
import { ConfigAppModule } from '../config/config-app.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';

@Module({
  imports: [
    ConfigAppModule,
    JwtModule.registerAsync({
      imports: [ConfigAppModule],
      useFactory: (apiConfig: ApiConfigService) => ({
        secret: apiConfig.jwtSecret,
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ApiConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, ApiConfigService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}

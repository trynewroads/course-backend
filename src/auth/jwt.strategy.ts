import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { UserDto } from './login.dto';

function cookieExtractor(req: Request): string | null {
  if (req && req.cookies) {
    const cookies: Record<string, string> = req.cookies as Record<
      string,
      string
    >;
    return cookies['session'] || null;
  }
  return null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwtSecret')!,
    });
  }

  validate(payload: UserDto): UserDto {
    return { username: payload.username };
  }
}

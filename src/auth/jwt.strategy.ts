import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { ApiConfigService } from '../config/api-config.service';
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
  constructor(apiConfigService: ApiConfigService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: apiConfigService.jwtSecret,
    });
  }

  validate(payload: UserDto): UserDto {
    return { username: payload.username };
  }
}

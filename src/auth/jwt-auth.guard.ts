import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ApiConfigService } from 'src/config/api-config.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly apiConfigService: ApiConfigService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const enableAuth = this.apiConfigService.enableAuth;
    if (enableAuth === false) {
      return true;
    }

    return super.canActivate(context);
  }
}

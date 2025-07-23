import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const method: string = req.method;
    const url: string = req.url;
    const body: unknown = req.body ?? {};
    const query = req.query;
    const params = req.params;
    const session: string | undefined =
      typeof req.cookies?.session === 'string'
        ? req.cookies.session
        : undefined;
    const start = Date.now();
    console.log(`Request:`, {
      method,
      url,
      body,
      session,
      params,
      query,
    });
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        console.log(`Request to ${method} ${url} completed in ${duration}ms`);
      }),
    );
  }
}

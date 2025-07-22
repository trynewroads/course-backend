import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('healthcheck')
  @ApiOperation({ summary: 'Healthcheck de la API' })
  @ApiResponse({
    status: 200,
    description: 'La API está funcionando correctamente.',
  })
  healthcheck(): { status: string } {
    return { status: 'ok' };
  }
}

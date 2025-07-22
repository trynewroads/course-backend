import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

const ENABLE_AUTH =
  process.env.ENABLE_AUTH === undefined
    ? true
    : process.env.ENABLE_AUTH === 'true';
const moduleImports = ENABLE_AUTH ? [TasksModule, AuthModule] : [TasksModule];

@Module({
  imports: moduleImports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

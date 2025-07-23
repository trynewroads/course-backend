import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { ApiConfigService } from '../config/api-config.service';
import { ConfigAppModule } from '../config/config-app.module';

@Module({
  imports: [
    ConfigAppModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigAppModule],
      useFactory: (apiConfig: ApiConfigService) => {
        const useDb = apiConfig.useDb;
        return useDb
          ? {
              type: 'postgres',
              host: apiConfig.dbHost,
              port: apiConfig.dbPort,
              username: apiConfig.dbUser,
              password: apiConfig.dbPass,
              database: apiConfig.dbName,
              entities: [User],
              synchronize: true,
            }
          : {
              type: 'sqlite',
              database: ':memory:',
              entities: [User],
              synchronize: true,
            };
      },
      inject: [ApiConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}

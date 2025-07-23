import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
              synchronize: true,
              autoLoadEntities: true,
            }
          : {
              type: 'sqlite',
              database: ':memory:',
              autoLoadEntities: true,
              synchronize: true,
            };
      },
      inject: [ApiConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}

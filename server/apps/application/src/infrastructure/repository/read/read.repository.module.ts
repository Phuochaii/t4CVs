import { Module } from '@nestjs/common';
import { TypeOrmApplicationReadRepository } from './application.read.repository';
import { UserNotificationSchemaMapper } from './mapper';
import { Projections } from './projection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseOptions } from './database/init';
import { ApplicationSchema } from './schema';
import { WriteRepositoryModule } from '../write/write-repository.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const defaultConfig: DatabaseOptions = {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: `${configService.get('DB_PASSWORD')}`,
          database: configService.get('DB_APPLICATION_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,
        };
        return defaultConfig;
      },
    }),
    TypeOrmModule.forFeature([ApplicationSchema]),
    WriteRepositoryModule,
  ],
  providers: [
    UserNotificationSchemaMapper,
    TypeOrmApplicationReadRepository,
    ...Projections,
  ],
  exports: [TypeOrmApplicationReadRepository],
})
export class ReadRepositoryModule {}

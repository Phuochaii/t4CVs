import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiger, DatabaseOptions } from './database/init';
import { EmployerSchema, PositionSchema } from './schema';
import { EmployerRepository, PositionRepository } from '../domain/repository';
import {
  TypeOrmEmployerRepository,
  TypeOrmPositionRepository,
} from './repository';

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
          database: configService.get('DB_EMPLOYER_DATABASE'),

          autoLoadEntities: true,
          synchronize: true,
        };
        const databaseConfiger = new DatabaseConfiger(defaultConfig);
        return databaseConfiger.config();
      },
    }),
    TypeOrmModule.forFeature([EmployerSchema, PositionSchema]),
  ],
  providers: [
    {
      provide: EmployerRepository,
      useClass: TypeOrmEmployerRepository,
    },
    {
      provide: PositionRepository,
      useClass: TypeOrmPositionRepository,
    },
  ],
  exports: [EmployerRepository, PositionRepository],
})
export class EmployerPersistenceModule {}

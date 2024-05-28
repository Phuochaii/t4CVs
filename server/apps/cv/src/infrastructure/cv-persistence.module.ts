import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CvRepository } from '../domain/repository';
import { CvSchema } from './schema';
import { TypeOrmCvRepository } from './repository/cv.repository';
import { DatabaseConfiger, DatabaseOptions } from './database/init';

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
          database: configService.get('DB_CV_DATABASE'),

          autoLoadEntities: true,
          synchronize: true,
        };
        const databaseConfiger = new DatabaseConfiger(defaultConfig);
        return databaseConfiger.config();
      },
    }),
    TypeOrmModule.forFeature([CvSchema]),
  ],
  providers: [
    {
      provide: CvRepository,
      useClass: TypeOrmCvRepository,
    },
  ],
  exports: [CvRepository],
})
export class CvPersistenceModule {}

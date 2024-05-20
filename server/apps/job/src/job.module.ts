import { Module } from '@nestjs/common';
import { JobService } from './domain/job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Job } from './infrastructure/schemas/job.schema';
import { JobDetailModule } from './job-detail/job-detail.module';
import { MajorModule } from './major/major.module';
import { LevelModule } from './level/level.module';
import { CurrencyModule } from './currency/currency.module';
import { FieldModule } from './field/field.module';
import { LocationModule } from './location/location.module';
import { ExperienceModule } from './experience/experience.module';
import { TypeModule } from './type/type.module';
import { DatabaseConfiger, DatabaseOptions } from './database/init';
import * as path from 'path';
import { JobRepository } from './domain/repository';
import { TypeOrmJobRepository } from './infrastructure/repository/job.repository';
import {
  CurrencyService,
  ExperienceService,
  FieldService,
  JobDetailService,
  LevelService,
  LocationService,
  MajorService,
  TypeService,
} from './domain/services';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: path.resolve(__dirname, '../../../configs/.env'),
    // }),
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
          database: configService.get('DB_JOB_DATABASE'),
          // entities: [__dirname + '/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true,
        };
        const databaseConfiger = new DatabaseConfiger(defaultConfig);
        return databaseConfiger.config();

        // type: 'postgres',
        // host: configService.get('DB_HOST'),
        // port: configService.get('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_JOB_DATABASE'),
        // // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // autoLoadEntities: true,
        // synchronize: true,
      },
    }),
    TypeOrmModule.forFeature([Job]),
    JobDetailModule,
    MajorModule,
    LevelModule,
    CurrencyModule,
    FieldModule,
    LocationModule,
    ExperienceModule,
    TypeModule, // JobRepository]),
  ],
  controllers: [JobController],
  providers: [
    {
      provide: JobService,
      useFactory: (
        jobRepository: JobRepository,
        jobDetailService: JobDetailService,
        majorService: MajorService,
        levelService: LevelService,
        currencyService: CurrencyService,
        fieldService: FieldService,
        locationService: LocationService,
        experienceService: ExperienceService,
        typeService: TypeService,
      ) => {
        return new JobService(
          jobRepository,
          jobDetailService,
          majorService,
          levelService,
          currencyService,
          fieldService,
          locationService,
          experienceService,
          typeService,
        );
      },
      inject: [
        JobRepository,
        JobDetailService,
        MajorService,
        LevelService,
        CurrencyService,
        FieldService,
        LocationService,
        ExperienceService,
        TypeService,
      ],
    },
    {
      provide: JobRepository,
      useClass: TypeOrmJobRepository,
    },
  ], //, JobRepository],
})
export class JobModule {}

import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Job } from './entities/job.entity';
import { JobDetailModule } from './job-detail/job-detail.module';
import { MajorModule } from './major/major.module';
import { LevelModule } from './level/level.module';
import { CurrencyModule } from './currency/currency.module';
import { FieldModule } from './field/field.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Job]),
    JobDetailModule,
    MajorModule,
    LevelModule,
    CurrencyModule,
    FieldModule, // JobRepository]),
  ],
  controllers: [JobController],
  providers: [JobService], //, JobRepository],
})
export class JobModule {}

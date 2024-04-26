import { Module } from '@nestjs/common';
import { CompanyServiceController } from './company-service.controller';
import { CompanyServiceService } from './company-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Company } from './entities/company.entity';
import { CampaignModule } from './campaign/campaign.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123456',
        database: 'company',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([Company]),
    CampaignModule,
  ],
  controllers: [CompanyServiceController],
  providers: [CompanyServiceService],
})
export class CompanyServiceModule {}

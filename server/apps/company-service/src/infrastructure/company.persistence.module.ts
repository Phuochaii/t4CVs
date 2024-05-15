import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiger, DatabaseOptions } from './database/init';
import { CampaignSchema, CompanySchema } from './schema';
import { CampaignRepository, CompanyRepository } from '../domain/repository';
import {
  TypeOrmCampaignRepository,
  TypeOrmCompanyRepository,
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
          database: configService.get('DB_COMPANY_DATABASE'),

          autoLoadEntities: true,
          synchronize: true,
        };
        const databaseConfiger = new DatabaseConfiger(defaultConfig);
        return databaseConfiger.config();
      },
    }),
    TypeOrmModule.forFeature([CompanySchema, CampaignSchema]),
  ],
  providers: [
    {
      provide: CompanyRepository,
      useClass: TypeOrmCompanyRepository,
    },
    {
      provide: CampaignRepository,
      useClass: TypeOrmCampaignRepository,
    },
  ],
  exports: [CompanyRepository, CampaignRepository],
})
export class CompanyPersistenceModule {}

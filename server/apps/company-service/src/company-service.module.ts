import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompanyApplicationModule } from './company.application.module';
import { CompanyServiceController } from './company-service.controller';
import { CampaignApplicationModule } from './campaign.application.module';
import { FieldApplicationModule } from './field.application.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: './configs/.env',
    // }),
    ConfigModule.forRoot(),
    CompanyApplicationModule,
    CampaignApplicationModule,
    FieldApplicationModule,
  ],
  controllers: [CompanyServiceController],
})
export class CompanyServiceModule {}

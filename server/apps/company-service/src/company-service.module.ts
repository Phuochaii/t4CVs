import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompanyApplicationModule } from './company.application.module';
import { CompanyServiceController } from './company-service.controller';
import { CampaignApplicationModule } from './campaign.application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './configs/.env',
    }),
    CompanyApplicationModule,
    CampaignApplicationModule,
  ],
  controllers: [CompanyServiceController],
})
export class CompanyServiceModule {}

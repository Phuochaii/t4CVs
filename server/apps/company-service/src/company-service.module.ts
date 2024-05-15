import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompanyApplicationModule } from './company.application.module';
import { CompanyServiceController } from './company-service.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './configs/.env',
    }),
    CompanyApplicationModule,
  ],
  controllers: [CompanyServiceController],
})
export class CompanyServiceModule {}

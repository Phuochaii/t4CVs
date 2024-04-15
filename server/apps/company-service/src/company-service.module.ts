import { Module } from '@nestjs/common';
import { CompanyServiceController } from './company-service.controller';
import { CompanyServiceService } from './company-service.service';

@Module({
  imports: [],
  controllers: [CompanyServiceController],
  providers: [CompanyServiceService],
})
export class CompanyServiceModule {}

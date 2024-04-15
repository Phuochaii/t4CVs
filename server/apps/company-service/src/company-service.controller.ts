import { Controller, Get } from '@nestjs/common';
import { CompanyServiceService } from './company-service.service';

@Controller()
export class CompanyServiceController {
  constructor(private readonly companyServiceService: CompanyServiceService) {}

  @Get()
  getHello(): string {
    return this.companyServiceService.getHello();
  }
}

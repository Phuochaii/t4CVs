import { Controller, Get } from '@nestjs/common';
import { CvServiceService } from './cv-service.service';

@Controller()
export class CvServiceController {
  constructor(private readonly cvServiceService: CvServiceService) {}

  @Get()
  getHello(): string {
    return this.cvServiceService.getHello();
  }
}

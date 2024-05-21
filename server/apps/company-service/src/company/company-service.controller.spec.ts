import { Test, TestingModule } from '@nestjs/testing';
import { CompanyServiceController } from './company-service.controller';
import { CompanyServiceService } from './company-service.service';

describe('CompanyServiceController', () => {
  let controller: CompanyServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CompanyServiceController],
      providers: [CompanyServiceService],
    }).compile();

    controller = app.get<CompanyServiceController>(CompanyServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CompanyServiceController } from './company-service.controller';
import { CompanyServiceService } from './company-service.service';

describe('CompanyServiceController', () => {
  let companyServiceController: CompanyServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CompanyServiceController],
      providers: [CompanyServiceService],
    }).compile();

    companyServiceController = app.get<CompanyServiceController>(CompanyServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(companyServiceController.getHello()).toBe('Hello World!');
    });
  });
});

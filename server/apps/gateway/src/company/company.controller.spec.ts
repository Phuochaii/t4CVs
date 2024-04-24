import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './Company.controller';
import { CompanyService } from './Company.service';

describe('CompanysController', () => {
  let controller: CompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

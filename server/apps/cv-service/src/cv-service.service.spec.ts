import { Test, TestingModule } from '@nestjs/testing';
import { CvServiceService } from './cv-service.service';

describe('CvServiceService', () => {
  let service: CvServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvServiceService],
    }).compile();

    service = module.get<CvServiceService>(CvServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

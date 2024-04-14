import { Test, TestingModule } from '@nestjs/testing';
import { CvServiceResolver } from './cv-service.resolver';
import { CvServiceService } from './cv-service.service';

describe('CvServiceResolver', () => {
  let resolver: CvServiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvServiceResolver, CvServiceService],
    }).compile();

    resolver = module.get<CvServiceResolver>(CvServiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { CompanyService } from '../company/company.service';

describe('JobService', () => {
  let service: JobService;

  const mockJobClient = {};
  const mockCompanyService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        CompanyService,
        {
          provide: 'JOB',
          useValue: mockJobClient,
        },
      ],
    })
      .overrideProvider(CompanyService)
      .useValue(mockCompanyService)
      .compile();

    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

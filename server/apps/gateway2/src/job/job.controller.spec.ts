import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './job.controller';
import { JobService } from './job.service';

describe('JobsController', () => {
  let controller: JobController;
  const mockJobService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [JobService],
    })
      .overrideProvider(JobService)
      .useValue(mockJobService)
      .compile();

    controller = module.get<JobController>(JobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

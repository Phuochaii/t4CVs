import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './job.controller';
import { JobService } from './job.service';

describe('JobController', () => {
  let controller: JobController;

  const mockJobService = {
    findJobByCampaignId: jest.fn((campaignId) => {
      return {
        id: Math.floor(Math.random() * 100), // Generate a random integer between 0 and 99
        titleRecruitment: 'demo title ',
        campaignId: campaignId,
      };
    }),
    hello: jest.fn(() => 'Hello World!'),
    findAll: jest.fn((query) => {
      const { page, limit } = query;
      return {
        page: page,
        limit: limit,
        total: Math.floor(Math.random() * 100), // Generate a random integer between 0 and 99
        total_page: Math.floor(Math.random() * 100), // Generate a random integer between 0 and 99
        data: Array.from({ length: limit }, (_, i) => ({
          id: i,
          titleRecruitment: 'demo title ',
          campaignId: Math.floor(Math.random() * 100), // Generate a random integer between 0 and 99
        })),
      };
    }),
  };

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

  it('should be defined 2', () => {
    expect(controller).toBeDefined();
  });

  it('should return hello', async () => {
    const result = await controller.hello();
    expect(result).toEqual(mockJobService.hello());
  });

  it('should return job by campaignId', () => {
    const campaignId = 1;
    expect(controller.findJobByCampaignId(campaignId)).toEqual({
      id: expect.any(Number),
      titleRecruitment: expect.any(String),
      campaignId: campaignId,
    });
  });

  it('should return list of job', () => {
    const query = {
      page: 3,
      limit: 10,
    };
    expect(controller.findAllJobs(query)).toEqual({
      page: query.page,
      limit: query.limit,
      total: expect.any(Number),
      total_page: expect.any(Number),
      data: expect.any(Array),
    });
  });
});

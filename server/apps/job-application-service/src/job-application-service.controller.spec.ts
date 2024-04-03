import { Test, TestingModule } from '@nestjs/testing';
import { JobApplicationServiceController } from './job-application-service.controller';
import { JobApplicationServiceService } from './job-application-service.service';

describe('JobApplicationServiceController', () => {
  let jobApplicationServiceController: JobApplicationServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JobApplicationServiceController],
      providers: [JobApplicationServiceService],
    }).compile();

    jobApplicationServiceController = app.get<JobApplicationServiceController>(JobApplicationServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(jobApplicationServiceController.getHello()).toBe('Hello World!');
    });
  });
});

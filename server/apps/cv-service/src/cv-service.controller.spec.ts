import { Test, TestingModule } from '@nestjs/testing';
import { CvServiceController } from './cv-service.controller';
import { CvServiceService } from './cv-service.service';

describe('CvServiceController', () => {
  let cvServiceController: CvServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CvServiceController],
      providers: [CvServiceService],
    }).compile();

    cvServiceController = app.get<CvServiceController>(CvServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cvServiceController.getHello()).toBe('Hello World!');
    });
  });
});

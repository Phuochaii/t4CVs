import { Test, TestingModule } from '@nestjs/testing';
import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';

describe('EmployerController', () => {
  let employerController: EmployerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployerController],
      providers: [EmployerService],
    }).compile();

    employerController = app.get<EmployerController>(EmployerController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(employerController).toBeDefined();
    });
  });
});

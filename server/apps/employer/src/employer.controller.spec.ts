import { Test, TestingModule } from '@nestjs/testing';
import { EmployerController } from './employer.controller';
import { EmployerApplication } from './domain';

describe('EmployerController', () => {
  let employerController: EmployerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployerController],
      providers: [EmployerApplication],
    }).compile();

    employerController = app.get<EmployerController>(EmployerController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(employerController).toBeDefined();
    });
  });
});

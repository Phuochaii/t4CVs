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
    it('should return "Hello World!"', () => {
      expect(employerController.getHello()).toBe('Hello World!');
    });
  });
});

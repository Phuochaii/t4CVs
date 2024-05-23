import { Module } from '@nestjs/common';
import { EmployerPersistenceModule } from './infrastructure/employer.persistence.module';
import { EmployerApplication } from './domain';
import { EmployerRepository, PositionRepository } from './domain/repository';
import {
  CreateEmployerService,
  GetEmployerByIdService,
  GetEmployerService,
  GetTotalEmployerService,
} from './domain/service';

@Module({
  imports: [EmployerPersistenceModule],
  providers: [
    {
      provide: CreateEmployerService,
      useFactory: (
        employerRepository: EmployerRepository,
        positionRepository: PositionRepository,
      ) => {
        return new CreateEmployerService(
          employerRepository,
          positionRepository,
        );
      },
      inject: [EmployerRepository, PositionRepository],
    },
    {
      provide: GetEmployerService,
      useFactory: (employerRepository: EmployerRepository) => {
        return new GetEmployerService(employerRepository);
      },
      inject: [EmployerRepository],
    },
    {
      provide: GetTotalEmployerService,
      useFactory: (employerRepository: EmployerRepository) => {
        return new GetTotalEmployerService(employerRepository);
      },
      inject: [EmployerRepository],
    },
    {
      provide: GetEmployerByIdService,
      useFactory: (employerRepository: EmployerRepository) => {
        return new GetEmployerByIdService(employerRepository);
      },
      inject: [EmployerRepository],
    },
    {
      provide: EmployerApplication,
      useFactory: (
        createEmployerService: CreateEmployerService,
        getAllEmployerService: GetEmployerService,
        getTotalEmployerService: GetTotalEmployerService,
        getEmployerByIdService: GetEmployerByIdService,
      ) => {
        return new EmployerApplication(
          createEmployerService,
          getAllEmployerService,
          getTotalEmployerService,
          getEmployerByIdService,
        );
      },
      inject: [
        CreateEmployerService,
        GetEmployerService,
        GetTotalEmployerService,
        GetEmployerByIdService,
      ],
    },
  ],
  exports: [EmployerApplication],
})
export class EmployerApplicationModule {}

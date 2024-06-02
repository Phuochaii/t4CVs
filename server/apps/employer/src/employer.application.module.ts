import { Module } from '@nestjs/common';
import { EmployerPersistenceModule } from './infrastructure/employer.persistence.module';
import { EmployerApplication } from './domain';
import { EmployerRepository, PositionRepository } from './domain/repository';
import {
  CreateEmployerService,
  GetAllEmployerByCompanyIdService,
  GetEmployerByIdService,
  GetEmployerService,
  GetTotalEmployerService,
  UpdateEmployerCompanyIdService,
  UpdateEmployerLicenseService,
  UpdateEmployerLicenseStatusService,
  UpdateEmployerPhoneStatusService,
  UpdateEmployerService,
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
      provide: GetAllEmployerByCompanyIdService,
      useFactory: (employerRepository: EmployerRepository) => {
        return new GetAllEmployerByCompanyIdService(employerRepository);
      },
      inject: [EmployerRepository],
    },
    {
      provide: UpdateEmployerCompanyIdService,
      useFactory: (employerRepository: EmployerRepository) => {
        return new UpdateEmployerCompanyIdService(employerRepository);
      },
      inject: [EmployerRepository],
    },
    {
      provide: UpdateEmployerLicenseService,
      useFactory: (employerRepository: EmployerRepository) => {
        return new UpdateEmployerLicenseService(employerRepository);
      },
      inject: [EmployerRepository],
    },
    {
      provide: UpdateEmployerLicenseStatusService,
      useFactory: (employerRepository: EmployerRepository) => {
        return new UpdateEmployerLicenseStatusService(employerRepository);
      },
      inject: [EmployerRepository],
    },
    {
      provide: UpdateEmployerPhoneStatusService,
      useFactory: (employerRepository: EmployerRepository) => {
        return new UpdateEmployerPhoneStatusService(employerRepository);
      },
      inject: [EmployerRepository],
    },
    {
      provide: UpdateEmployerService,
      useFactory: (employerRepository: EmployerRepository) => {
        return new UpdateEmployerService(employerRepository);
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
        getAllEmployerByCompanyIdService: GetAllEmployerByCompanyIdService,
        updateEmployerCompanyIdService: UpdateEmployerCompanyIdService,
        updateEmployerLicenseService: UpdateEmployerLicenseService,
        updateEmployerLicenseStatusService: UpdateEmployerLicenseStatusService,
        updateEmployerPhoneStatusService: UpdateEmployerPhoneStatusService,
        updateEmployerService: UpdateEmployerService,
      ) => {
        return new EmployerApplication(
          createEmployerService,
          getAllEmployerService,
          getTotalEmployerService,
          getEmployerByIdService,
          getAllEmployerByCompanyIdService,
          updateEmployerCompanyIdService,
          updateEmployerLicenseService,
          updateEmployerLicenseStatusService,
          updateEmployerPhoneStatusService,
          updateEmployerService,
        );
      },
      inject: [
        CreateEmployerService,
        GetEmployerService,
        GetTotalEmployerService,
        GetEmployerByIdService,
        GetAllEmployerByCompanyIdService,
        UpdateEmployerCompanyIdService,
        UpdateEmployerLicenseService,
        UpdateEmployerLicenseStatusService,
        UpdateEmployerPhoneStatusService,
        UpdateEmployerService,
      ],
    },
  ],
  exports: [EmployerApplication],
})
export class EmployerApplicationModule {}

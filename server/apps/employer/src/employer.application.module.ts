import { Module } from '@nestjs/common';
import { EmployerPersistenceModule } from './infrastructure/employer.persistence.module';
import { EmployerApplication } from './domain';
import { EmployerRepository, PositionRepository } from './domain/repository';
import {
  CreateEmployerService,
  GetEmployerByIdService,
  GetEmployerService,
  GetTotalEmployerService,
  UpdateEmployerCompanyIdService,
  UpdateEmployerLicenseService,
  UpdateEmployerLicenseStatusService,
  UpdateEmployerPhoneStatusService,
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
      provide: EmployerApplication,
      useFactory: (
        createEmployerService: CreateEmployerService,
        getAllEmployerService: GetEmployerService,
        getTotalEmployerService: GetTotalEmployerService,
        getEmployerByIdService: GetEmployerByIdService,
        updateEmployerCompanyIdService: UpdateEmployerCompanyIdService,
        updateEmployerLicenseService: UpdateEmployerLicenseService,
        updateEmployerLicenseStatusService: UpdateEmployerLicenseStatusService,
        updateEmployerPhoneStatusService: UpdateEmployerPhoneStatusService,
      ) => {
        return new EmployerApplication(
          createEmployerService,
          getAllEmployerService,
          getTotalEmployerService,
          getEmployerByIdService,
          updateEmployerCompanyIdService,
          updateEmployerLicenseService,
          updateEmployerLicenseStatusService,
          updateEmployerPhoneStatusService,
        );
      },
      inject: [
        CreateEmployerService,
        GetEmployerService,
        GetTotalEmployerService,
        GetEmployerByIdService,
        UpdateEmployerCompanyIdService,
        UpdateEmployerLicenseService,
        UpdateEmployerLicenseStatusService,
        UpdateEmployerPhoneStatusService,
      ],
    },
  ],
  exports: [EmployerApplication],
})
export class EmployerApplicationModule {}

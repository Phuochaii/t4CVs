import { Module } from '@nestjs/common';
import { ApplicationApplication } from './domain/application.application';
import {
  CreateApplicationService,
  GetApplicationService,
  GetAllApplicationService,
  UpdateApplicationService,
  GetByCampaignIdWithPaginationService,
  GetByCampaignIdService,
  GetByUserIdApplicationService,
  GetByUserIdPaginationApplicationService,
} from './domain/service';
import { InfrastructureModule } from './infrastructure/infrastucture.module';
import { ApplicationFactory } from './domain/factory/application.factory';
import { ApplicationReadRepository, ApplicationWriteRepository } from './domain/repository';

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: ApplicationFactory,
      useFactory: (repository: ApplicationWriteRepository) => {
        return new ApplicationFactory(repository);
      },
      inject: [ApplicationWriteRepository],
    },
    {
      provide: CreateApplicationService,
      useFactory: (
        repository: ApplicationWriteRepository,
        factory: ApplicationFactory,
      ) => {
        return new CreateApplicationService(repository, factory);
      },
      inject: [ApplicationWriteRepository, ApplicationFactory],
    },
    {
      provide: GetApplicationService,
      useFactory: (repository: ApplicationReadRepository) => {
        return new GetApplicationService(repository);
      },
      inject: [ApplicationReadRepository],
    },
    {
      provide: GetAllApplicationService,
      useFactory: (repository: ApplicationReadRepository) => {
        return new GetAllApplicationService(repository);
      },
      inject: [ApplicationReadRepository],
    },
    {
      provide: UpdateApplicationService,
      useFactory: (repository: ApplicationReadRepository) => {
        return new UpdateApplicationService(repository);
      },
      inject: [ApplicationReadRepository],
    },
    {
      provide: GetByCampaignIdWithPaginationService,
      useFactory: (repository: ApplicationReadRepository) => {
        return new GetByCampaignIdWithPaginationService(repository);
      },
      inject: [ApplicationReadRepository],
    },
    {
      provide: GetByCampaignIdService,
      useFactory: (repository: ApplicationReadRepository) => {
        return new GetByCampaignIdService(repository);
      },
      inject: [ApplicationReadRepository],
    },
    {
      provide: GetByUserIdApplicationService,
      useFactory: (repository: ApplicationReadRepository) => {
        return new GetByUserIdApplicationService(repository);
      },
      inject: [ApplicationReadRepository],
    },
    {
      provide: GetByUserIdPaginationApplicationService,
      useFactory: (repository: ApplicationReadRepository) => {
        return new GetByUserIdPaginationApplicationService(
          repository,
        );
      },
      inject: [ApplicationReadRepository],
    },
    {
      provide: ApplicationApplication,
      useFactory: (
        createApplicationService: CreateApplicationService,
        getApplicationService: GetApplicationService,
        getAllApplicationService: GetAllApplicationService,
        getByCampaignIdApplication: GetByCampaignIdWithPaginationService,
        updateApplicationService: UpdateApplicationService,
        getAllByCampaignIdApplication: GetByCampaignIdService,
        getByUserIdApplication: GetByUserIdApplicationService,
        getByUserIdPaginationApplication: GetByUserIdPaginationApplicationService,
      ) => {
        return new ApplicationApplication(
          createApplicationService,
          getApplicationService,
          getAllApplicationService,
          getByCampaignIdApplication,
          updateApplicationService,
          getAllByCampaignIdApplication,
          getByUserIdApplication,
          getByUserIdPaginationApplication,
        );
      },
      inject: [
        CreateApplicationService,
        GetApplicationService,
        GetAllApplicationService,
        GetByCampaignIdWithPaginationService,
        UpdateApplicationService,
        GetByCampaignIdService,
        GetByUserIdApplicationService,
        GetByUserIdPaginationApplicationService,
      ],
    },
  ],
  exports: [ApplicationApplication],
})
export class DomainApplicationModule {}

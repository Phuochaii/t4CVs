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
import { ApplicationRepository } from './domain/repository';
import { ApplicationFactory } from './domain/factory/application.factory';

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: ApplicationFactory,
      useFactory: (repository: ApplicationRepository) => {
        return new ApplicationFactory(repository);
      },
      inject: [ApplicationRepository],
    },
    {
      provide: CreateApplicationService,
      useFactory: (
        repository: ApplicationRepository,
        factory: ApplicationFactory,
      ) => {
        return new CreateApplicationService(repository, factory);
      },
      inject: [ApplicationRepository, ApplicationFactory],
    },
    {
      provide: GetApplicationService,
      useFactory: (applicationRepository: ApplicationRepository) => {
        return new GetApplicationService(applicationRepository);
      },
      inject: [ApplicationRepository],
    },
    {
      provide: GetAllApplicationService,
      useFactory: (applicationRepository: ApplicationRepository) => {
        return new GetAllApplicationService(applicationRepository);
      },
      inject: [ApplicationRepository],
    },
    {
      provide: UpdateApplicationService,
      useFactory: (applicationRepository: ApplicationRepository) => {
        return new UpdateApplicationService(applicationRepository);
      },
      inject: [ApplicationRepository],
    },
    {
      provide: GetByCampaignIdWithPaginationService,
      useFactory: (applicationRepository: ApplicationRepository) => {
        return new GetByCampaignIdWithPaginationService(applicationRepository);
      },
      inject: [ApplicationRepository],
    },
    {
      provide: GetByCampaignIdService,
      useFactory: (applicationRepository: ApplicationRepository) => {
        return new GetByCampaignIdService(applicationRepository);
      },
      inject: [ApplicationRepository],
    },
    {
      provide: GetByUserIdApplicationService,
      useFactory: (applicationRepository: ApplicationRepository) => {
        return new GetByUserIdApplicationService(applicationRepository);
      },
      inject: [ApplicationRepository],
    },
    {
      provide: GetByUserIdPaginationApplicationService,
      useFactory: (applicationRepository: ApplicationRepository) => {
        return new GetByUserIdPaginationApplicationService(
          applicationRepository,
        );
      },
      inject: [ApplicationRepository],
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

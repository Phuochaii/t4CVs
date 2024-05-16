import { Module } from '@nestjs/common';
import { ApplicationApplication } from './domain/application.application';
import {
  CreateApplicationService,
  GetApplicationService,
  GetAllApplicationService,
  UpdateApplicationService,
  GetByCampaignIdApplicationService,
  GetAllByCampaignIdApplicationService,
  GetByUserIdApplicationService,
  GetByUserIdPaginationApplicationService,
} from './domain/service';
import { NotificationPersistenceModule } from './infrastructure/application-persistence.module';
import { ApplicationRepository } from './domain/repository';

@Module({
  imports: [NotificationPersistenceModule],
  providers: [
    {
      provide: CreateApplicationService,
      useFactory: (applicationRepository: ApplicationRepository) => {
        return new CreateApplicationService(applicationRepository);
      },
      inject: [ApplicationRepository],
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
      provide: GetByCampaignIdApplicationService,
      useFactory: (applicationRepository: ApplicationRepository) => {
        return new GetByCampaignIdApplicationService(applicationRepository);
      },
      inject: [ApplicationRepository],
    },
    {
      provide: GetAllByCampaignIdApplicationService,
      useFactory: (applicationRepository: ApplicationRepository) => {
        return new GetAllByCampaignIdApplicationService(applicationRepository);
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
        getByCampaignIdApplication: GetByCampaignIdApplicationService,
        updateApplicationService: UpdateApplicationService,
        getAllByCampaignIdApplication: GetAllByCampaignIdApplicationService,
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
        GetByCampaignIdApplicationService,
        UpdateApplicationService,
        GetAllByCampaignIdApplicationService,
        GetByUserIdApplicationService,
        GetByUserIdPaginationApplicationService,
      ],
    },
  ],
  exports: [ApplicationApplication],
})
export class ApplicationApplicationModule {}

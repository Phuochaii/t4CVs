import { Module } from '@nestjs/common';
import { ApplicationApplication } from './domain/application.application';
import {
  CreateApplicationService,
  GetApplicationService,
  GetAllApplicationService,
  UpdateApplicationService,
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
        return new GetApplicationService(applicationRepository);
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
      provide: ApplicationApplication,
      useFactory: (
        createApplicationService: CreateApplicationService,
        getApplicationService: GetApplicationService,
        getAllApplicationService: GetAllApplicationService,
        updateApplicationService: UpdateApplicationService,
      ) => {
        return new ApplicationApplication(
          createApplicationService,
          getApplicationService,
          getAllApplicationService,
          updateApplicationService,
        );
      },
      inject: [
        CreateApplicationService,
        GetApplicationService,
        GetAllApplicationService,
        UpdateApplicationService,
      ],
    },
  ],
  exports: [ApplicationApplication],
})
export class ApplicationApplicationModule {}

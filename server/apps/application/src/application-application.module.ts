import { Module } from '@nestjs/common';
import { ApplicationApplication } from './domain/application.application';
import {
  CreateApplicationService,
  GetApplicationService,
  //   GetUserNotificationsService,
  //   GetUserTotalNotificationsService,
  //   UpdateNotificationStatusService,
} from './domain/service';
import { NotificationPersistenceModule } from './infrastructure/application-persistence.module';
import { ApplicationRepository } from './domain/repository';

@Module({
  imports: [NotificationPersistenceModule],
  providers: [
    // {
    //   provide: GetUserNotificationsService,
    //   useFactory: (userNotificationRepository: UserNotificationRepository) => {
    //     return new GetUserNotificationsService(userNotificationRepository);
    //   },
    //   inject: [UserNotificationRepository],
    // },
    // {
    //   provide: GetUserTotalNotificationsService,
    //   useFactory: (userNotificationRepository: UserNotificationRepository) => {
    //     return new GetUserTotalNotificationsService(userNotificationRepository);
    //   },
    //   inject: [UserNotificationRepository],
    // },
    {
      provide: CreateApplicationService,
      useFactory: (
        applicationRepository: ApplicationRepository,
        // userNotificationRepository: UserNotificationRepository,
      ) => {
        return new CreateApplicationService(
          applicationRepository,
          //   userNotificationRepository,
        );
      },
      inject: [ApplicationRepository],
    },
    {
      provide: GetApplicationService,
      useFactory: (
        applicationRepository: ApplicationRepository,
        // userNotificationRepository: UserNotificationRepository,
      ) => {
        return new GetApplicationService(
          applicationRepository,
          //   userNotificationRepository,
        );
      },
      inject: [ApplicationRepository],
    },
    // {
    //   provide: UpdateNotificationStatusService,
    //   useFactory: (userNotificationRepository: UserNotificationRepository) => {
    //     return new UpdateNotificationStatusService(userNotificationRepository);
    //   },
    //   inject: [UserNotificationRepository],
    // },
    {
      provide: ApplicationApplication,
      useFactory: (
        createApplicationService: CreateApplicationService,
        getApplicationService: GetApplicationService,
      ) => {
        return new ApplicationApplication(
          createApplicationService,
          getApplicationService,
        );
      },
      inject: [CreateApplicationService, GetApplicationService],
    },
  ],
  exports: [ApplicationApplication],
})
export class ApplicationApplicationModule {}

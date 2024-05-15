import { Module } from '@nestjs/common';
import { ApplicationApplication } from './domain/application.application';
import {
  CreateApplicationService,
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
        notificationRepository: ApplicationRepository,
        // userNotificationRepository: UserNotificationRepository,
      ) => {
        return new CreateApplicationService(
          notificationRepository,
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
        // getUserNotificationsService: GetUserNotificationsService,
        // getUserTotalNotificationsService: GetUserTotalNotificationsService,
        createApplicationService: CreateApplicationService,
        // updateNotificationStatusService: UpdateNotificationStatusService,
      ) => {
        return new ApplicationApplication(
          // getUserNotificationsService,
          // getUserTotalNotificationsService,
          createApplicationService,
          // updateNotificationStatusService,
        );
      },
      inject: [
        // GetUserNotificationsService,
        // GetUserTotalNotificationsService,
        CreateApplicationService,
        // UpdateNotificationStatusService,
      ],
    },
  ],
  exports: [ApplicationApplication],
})
export class ApplicationApplicationModule {}

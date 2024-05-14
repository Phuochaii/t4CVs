import { Module } from '@nestjs/common';
import { NotificationApplication } from './domain/notification.application';
import { CreateNotificationService, GetUserNotificationsService, GetUserTotalNotificationsService } from './domain/service';
import { NotificationPersistenceModule } from './infrastructure/notification-persistence.module';
import { NotificationRepository, UserNotificationRepository } from './domain/repository';

@Module({
    imports: [
        NotificationPersistenceModule,
    ],
    providers: [
        {
            provide: GetUserNotificationsService,
            useFactory: (
                userNotificationRepository: UserNotificationRepository
            ) => {
                return new GetUserNotificationsService(userNotificationRepository);
            },
            inject: [UserNotificationRepository],
        },
        {
            provide: GetUserTotalNotificationsService,
            useFactory: (
                userNotificationRepository: UserNotificationRepository
            ) => {
                return new GetUserTotalNotificationsService(userNotificationRepository);
            },
            inject: [UserNotificationRepository],
        },
        {
            provide: CreateNotificationService,
            useFactory: (
                notificationRepository: NotificationRepository,
                userNotificationRepository: UserNotificationRepository
            ) => {
                return new CreateNotificationService(
                    notificationRepository,
                    userNotificationRepository
                );
            },
            inject: [NotificationRepository, UserNotificationRepository],

        },
        {
            provide: NotificationApplication,
            useFactory: (
                getUserNotificationsService: GetUserNotificationsService,
                getUserTotalNotificationsService: GetUserTotalNotificationsService,
                createNotificationService: CreateNotificationService
            ) => {
                return new NotificationApplication(
                    getUserNotificationsService,
                    getUserTotalNotificationsService,
                    createNotificationService
                );
            },
            inject: [
                GetUserNotificationsService,
                GetUserTotalNotificationsService,
                CreateNotificationService,
            ],
        },
    ],
    exports: [NotificationApplication],
})
export class NotificationApplicationModule { }

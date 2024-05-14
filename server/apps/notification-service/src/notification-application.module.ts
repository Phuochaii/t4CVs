import { Module } from '@nestjs/common';
import { NotificationApplication } from './domain/notification.application';
import { CreateNotificationService, GetUserNotificationsService, GetUserTotalNotificationsService, UpdateNotificationStatusService } from './domain/service';
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
            provide: UpdateNotificationStatusService,
            useFactory: (
                userNotificationRepository: UserNotificationRepository
            ) => {
                return new UpdateNotificationStatusService(userNotificationRepository);
            },
            inject: [UserNotificationRepository],
        },
        {
            provide: NotificationApplication,
            useFactory: (
                getUserNotificationsService: GetUserNotificationsService,
                getUserTotalNotificationsService: GetUserTotalNotificationsService,
                createNotificationService: CreateNotificationService,
                updateNotificationStatusService: UpdateNotificationStatusService
            ) => {
                return new NotificationApplication(
                    getUserNotificationsService,
                    getUserTotalNotificationsService,
                    createNotificationService,
                    updateNotificationStatusService
                );
            },
            inject: [
                GetUserNotificationsService,
                GetUserTotalNotificationsService,
                CreateNotificationService,
                UpdateNotificationStatusService
            ],
        },
    ],
    exports: [NotificationApplication],
})
export class NotificationApplicationModule { }

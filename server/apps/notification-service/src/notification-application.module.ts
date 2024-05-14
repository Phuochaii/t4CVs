import { Module } from '@nestjs/common';
import { NotificationApplication } from './domain/notification.application';
import { CreateNotificationService, GetUserNotificationsService, GetUserTotalNotificationsService } from './domain/service';
import { NotificationPersistenceModule } from './infrastructure/notification-persistence.module';
import { NotificationRepository, UserNotificationRepository } from './domain/repository';
import { createProvider } from '../../../libs/common/src/DI';

@Module({
    imports: [
        NotificationPersistenceModule,
    ],
    providers: [
        createProvider({
            dependencies: [UserNotificationRepository],
            domainClass: GetUserNotificationsService,
        }),
        createProvider({
            dependencies: [UserNotificationRepository],
            domainClass: GetUserTotalNotificationsService,
        }),
        createProvider({
            dependencies: [
                NotificationRepository,
                UserNotificationRepository,
            ],
            domainClass: CreateNotificationService,
        }),
        createProvider({
            dependencies: [
                GetUserNotificationsService,
                GetUserTotalNotificationsService,
                CreateNotificationService
            ],
            domainClass: NotificationApplication,
        }),
    ],
    exports: [NotificationApplication],
})
export class NotificationApplicationModule { }

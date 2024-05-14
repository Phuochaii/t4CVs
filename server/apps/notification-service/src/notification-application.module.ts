import { Module } from '@nestjs/common';
import { NotificationApplication } from './domain/notification.application';
import { GetUserNotificationsService, GetUserTotalNotificationsService } from './domain/service';
import { NotificationPersistenceModule } from './infrastructure/notification-persistence.module';
import { UserNotificationRepository } from './domain/repository';
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
            dependencies: [GetUserNotificationsService, GetUserTotalNotificationsService],
            domainClass: NotificationApplication,
        }),
    ],
    exports: [NotificationApplication],
})
export class NotificationApplicationModule { }

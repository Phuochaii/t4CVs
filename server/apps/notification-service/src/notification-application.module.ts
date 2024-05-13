import { Module } from '@nestjs/common';
import { NotificationApplication } from './domain/notification.application';
import { GetUserNotificationsService, GetUserTotalNotificationsService } from './domain/service';
import { NotificationPersistenceModule } from './notification-persistence.module';

@Module({
    imports: [
        NotificationPersistenceModule,
    ],
    providers: [
        {
            provide: NotificationApplication,
            useClass: NotificationApplication
        },
        // NotificationApplication,
        GetUserNotificationsService,
        GetUserTotalNotificationsService,
    ],
    exports: [NotificationApplication],
})
export class NotificationApplicationModule { }

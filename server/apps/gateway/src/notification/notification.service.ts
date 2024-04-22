import { request } from 'http';
import { NOTIFICATION_PACKAGE_NAME, NOTIFICATION_SERVICE_NAME, NotificationServiceClient, SendNotificationRequest, status } from '@app/common/proto/notification';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PaginationRequest } from '@app/common';

@Injectable()
export class NotificationService implements OnModuleInit {
    private notificationServiceClient: NotificationServiceClient;
    constructor(
        @Inject(NOTIFICATION_PACKAGE_NAME) private readonly client: ClientGrpc,
    ) { }
    onModuleInit() {
        this.notificationServiceClient = this.client.getService<NotificationServiceClient>(NOTIFICATION_SERVICE_NAME);
    }

    create(request: SendNotificationRequest) {
        return this.notificationServiceClient.sendNotification(request);
    }

    getAllOfUser(userId: number, paginationRequest: PaginationRequest) {
        return this.notificationServiceClient.getNotifications({
            user: { id: userId },
            paginationRequest,
        });
    }

    updateStatus(userId: number, notificationId: number, status: status) {
        return this.notificationServiceClient.updateNotificationStatus({
            user: { id: userId },
            notificationId,
            status,
        });
    }
}

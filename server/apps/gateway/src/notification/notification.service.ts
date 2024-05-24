import {
  NOTIFICATION_PACKAGE_NAME,
  NOTIFICATION_SERVICE_NAME,
  NotificationServiceClient,
  SendNotificationRequest,
  status,
} from '@app/common/proto/notification';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PaginationRequest } from '@app/common/dto/pagination';
import { first, firstValueFrom, lastValueFrom, map } from 'rxjs';
import { DateTimestampConverter } from '@app/common/conveters';

export enum NotificationUserRole {
  USER = 'user',
  HR = 'hr',
}
export class NotificationUserId {
  constructor(
    private id: string,
    private role: NotificationUserRole,
  ) {}
  get userId() {
    return `${this.role}-${this.id}`;
  }
}
@Injectable()
export class NotificationService implements OnModuleInit {
  private notificationServiceClient: NotificationServiceClient;
  constructor(
    @Inject(NOTIFICATION_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.notificationServiceClient =
      this.client.getService<NotificationServiceClient>(
        NOTIFICATION_SERVICE_NAME,
      );
  }

  create(
    notificationUserIds: NotificationUserId[],
    request: Omit<SendNotificationRequest, 'users'>,
  ) {
    return this.notificationServiceClient.sendNotification({
      ...request,
      users: notificationUserIds.map((notificationUserId) => ({
        id: notificationUserId.userId,
      })),
    });
  }

  async getAllOf(
    notificationUserId: NotificationUserId,
    paginationRequest: PaginationRequest,
  ) {
    const { pagination, data = [] } = await lastValueFrom(
      this.notificationServiceClient.getNotifications({
        user: { id: notificationUserId.userId },
        paginationRequest,
      }),
    );
    return {
      pagination,
      data: data.map((notification) => ({
        ...notification,
        createdAt: DateTimestampConverter.fromTimestamp(notification.createdAt),
      })),
    };
  }

  updateStatus(
    notificationUserId: NotificationUserId,
    notificationId: number,
    status: status,
  ) {
    return this.notificationServiceClient.updateNotificationStatus({
      user: { id: notificationUserId.userId },
      notificationId,
      status,
    });
  }
}

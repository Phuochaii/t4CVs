import { Controller } from '@nestjs/common';
import {
  GetUserNotificationsRequest,
  GetUserNotificationsResponse,
  NotificationServiceController,
  NotificationServiceControllerMethods,
  SendNotificationRequest,
  SendNotificationResponse,
  UpdateNotificationStatusRequest,
  UpdateNotificationStatusResponse,
  status,
} from '@app/common/proto/notification';
import { Observable } from 'rxjs';
import { PaginationRequest } from '@app/common/dto/pagination';
import { DateTimestampConverter } from '@app/common/conveters';
import { NotificationApplication } from './domain/notification.application';
import { UserNotificationAggregate } from './domain/aggregate';

@Controller()
@NotificationServiceControllerMethods()
export class NotificationController implements NotificationServiceController {
  constructor(
    private readonly notificationApplication: NotificationApplication,
  ) { }

  async updateNotificationStatus({
    user: { id: userId },
    notificationId,
    status,
  }: UpdateNotificationStatusRequest): Promise<UpdateNotificationStatusResponse> {
    const updatedStatus = await this.notificationApplication.updateNotificationStatus({
      user: { id: userId },
      notificationId,
      status: status as unknown as UserNotificationAggregate['status'],
    });
  
    return {
      status: updatedStatus.status as unknown as status,
    };
  }

  async getNotifications({
    user,
    paginationRequest,
  }: GetUserNotificationsRequest): Promise<GetUserNotificationsResponse> {
    const paginationReq = new PaginationRequest(paginationRequest);
    const notifications = await this.notificationApplication.getNotifications({
      user,
      paginationRequest: paginationReq,
    });

    return {
      pagination: notifications.pagination,
      data: notifications.data.map((notification) => {
        return {
          ...notification,
          status: notification.status as unknown as status,
          createdAt: DateTimestampConverter.toTimestamp(notification.createdAt),
        };
      }),
    }
  }

  async sendNotification(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse | Observable<SendNotificationResponse>> {
    await this.notificationApplication.createNotification({
      notification: {
        title: request.title,
        content: request.content,
        link: request.link,
      },
      users: request.users,
    });
    return true;
  }
}

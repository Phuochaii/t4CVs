import { Controller } from '@nestjs/common';
import { NotificationServiceService } from './services';
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
import { PaginationRequest, PaginationResponse } from '@app/common/dto/pagination';
import { NotificationStatus } from './entities';
import { DateTimestampConverter } from '@app/common/conveters';
import { NotificationApplication } from './domain/notification.application';

@Controller()
@NotificationServiceControllerMethods()
export class NotificationController implements NotificationServiceController {
  constructor(
    private readonly notificationServiceService: NotificationServiceService,
    private readonly notificationApplication: NotificationApplication,
  ) { }

  async updateNotificationStatus({
    user: { id: userId },
    notificationId,
    status,
  }: UpdateNotificationStatusRequest): Promise<UpdateNotificationStatusResponse> {
    const userNotification =
      await this.notificationServiceService.updateNotificationStatus(
        userId,
        notificationId,
        status as unknown as NotificationStatus,
      );

    return {
      status: userNotification.status as unknown as status,
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
    await this.notificationServiceService.createNotification(request);
    return true;
  }
}

import { Controller } from '@nestjs/common';
import { NotificationServiceService } from './services';
import { GetUserNotificationsRequest, GetUserNotificationsResponse, NotificationServiceController, NotificationServiceControllerMethods, SendNotificationRequest, SendNotificationResponse, UpdateNotificationStatusRequest, UpdateNotificationStatusResponse, status } from '@app/common/proto/notification';
import { Observable } from 'rxjs';
import { PaginationRequest, PaginationResponse } from '@app/common';
import { NotificationStatus } from './entities';
import { DateTimestampConverter } from '@app/common/conveters';

@Controller()
@NotificationServiceControllerMethods()
export class NotificationController implements NotificationServiceController {
  constructor(private readonly notificationServiceService: NotificationServiceService) { }

  async updateNotificationStatus(
    {
      user: { id: userId },
      notificationId,
      status
    }: UpdateNotificationStatusRequest
  ): Promise<UpdateNotificationStatusResponse> {
    const userNotification = await this.notificationServiceService.updateNotificationStatus(
      userId,
      notificationId,
      status as unknown as NotificationStatus
    );

    return {
      status: userNotification.status as unknown as status,
    }
  }

  async getNotifications(
    {
      user,
      paginationRequest
    }: GetUserNotificationsRequest
  ): Promise<GetUserNotificationsResponse> {
    const paginationReq = new PaginationRequest(paginationRequest);

    const userNotifications = await this.notificationServiceService.getNotifications(user.id, paginationReq);
    const total = await this.notificationServiceService.getTotalNotifications(user.id);
    return {
      pagination: new PaginationResponse(total, userNotifications, paginationReq),
      data: userNotifications.map((userNotification) => {
        const notification = userNotification.notification;
        return {
          id: notification.id,
          title: notification.title,
          content: notification.content,
          link: notification.link,
          status: userNotification.status as unknown as status,
          createdAt: DateTimestampConverter.toTimestamp(notification.createdAt),
        };
      }),
    };
  }

  async sendNotification(request: SendNotificationRequest): Promise<SendNotificationResponse | Observable<SendNotificationResponse>> {
    await this.notificationServiceService.createNotification(request);
    return true;
  }

}

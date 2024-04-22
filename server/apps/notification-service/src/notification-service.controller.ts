import { Controller } from '@nestjs/common';
import { NotificationServiceService } from './services';
import { Empty, GetUserNotificationsRequest, GetUserNotificationsResponse, NotificationServiceController, NotificationServiceControllerMethods, SendNotificationRequest, SendNotificationResponse, UpdateNotificationStatusRequest, status } from '@app/common/proto/notification';
import { Observable } from 'rxjs';
import { PaginationRequest, PaginationResponse } from '@app/common';
import { NotificationStatus } from './entities';

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
  ): Promise<Empty | Observable<Empty>> {
    await this.notificationServiceService.updateNotificationStatus(
      userId,
      notificationId,
      status as unknown as NotificationStatus
    );
    return true;
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
        return {
          id: userNotification.notification.id,
          title: userNotification.notification.title,
          content: userNotification.notification.content,
          link: userNotification.notification.link,
          status: userNotification.status as unknown as status,
        };
      }),
    };
  }

  async sendNotification(request: SendNotificationRequest): Promise<SendNotificationResponse | Observable<SendNotificationResponse>> {
    await this.notificationServiceService.createNotification(request);
    return true;
  }

}

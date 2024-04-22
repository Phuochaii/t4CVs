import { Controller } from '@nestjs/common';
import { NotificationServiceService } from './services';
import { GetUserNotificationsRequest, NotificationServiceController, NotificationServiceControllerMethods, Notifications, SendNotificationRequest, SendNotificationResponse, User, status } from '@app/common/proto/notification';
import { Observable } from 'rxjs';
import { PaginationRequest } from '@app/common';

@Controller()
@NotificationServiceControllerMethods()
export class NotificationController implements NotificationServiceController {
  constructor(private readonly notificationServiceService: NotificationServiceService) { }

  async getNotifications(
    {
      user,
      paginationRequest
    }: GetUserNotificationsRequest
  ): Promise<Notifications> {
    const paginationReq = new PaginationRequest(paginationRequest);
    const userNotifications = await this.notificationServiceService.getNotifications(user.id, paginationReq);
    return {
      notifications: userNotifications.map((userNotification) => {
        return {
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

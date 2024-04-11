import { Controller } from '@nestjs/common';
import { NotificationServiceService } from './services';
import { NotificationServiceController, NotificationServiceControllerMethods, SendNotificationRequest, SendNotificationResponse } from '@app/common/proto/notification';
import { Observable } from 'rxjs';

@Controller()
@NotificationServiceControllerMethods()
export class NotificationController implements NotificationServiceController {
  constructor(private readonly notificationServiceService: NotificationServiceService) { }
  async sendNotification(request: SendNotificationRequest): Promise<SendNotificationResponse | Observable<SendNotificationResponse>> {
    await this.notificationServiceService.createNotification(request);
    return true;
  }

}

import { NotificationStatus } from "../aggregate";
import { User, Notification } from "../entity";

export class UpdateNotificationStatusDto {
    user: User;
    notificationId: Notification['id'];
    status: NotificationStatus;
}

export class UpdateNotificationStatusResponseDto {
    status: NotificationStatus;
}
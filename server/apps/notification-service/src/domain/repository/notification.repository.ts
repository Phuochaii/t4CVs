import { NotificationDto } from "../dto";
import { Notification } from "../entity"

export abstract class NotificationRepository {
    abstract createNotification(
        notification: NotificationDto
    ): Promise<Notification>;
}
import { User } from "../entity";
import { NotificationDto } from "./notification.dto";

export class CreateNotificationDto {
    users: User[];
    notification: NotificationDto;
}
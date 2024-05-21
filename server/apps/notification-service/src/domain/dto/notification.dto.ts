import { Notification } from "../entity";

export class NotificationDto implements Omit<Notification, 'id' | 'createdAt'> {
    title: string;
    content: string;
    link: string;
} 

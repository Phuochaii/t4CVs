import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Notification } from "./notification";

export enum NotificationStatus {
    UNREAD = 0,
    READ = 1
}

@Entity()
export class User_Notification {
    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    notificationId: number;

    @ManyToOne(() => Notification)
    @JoinColumn({ name: 'notificationId' })
    notification: Notification;

    @Column("enum", { enum: NotificationStatus, default: NotificationStatus.UNREAD })
    status: NotificationStatus;
}
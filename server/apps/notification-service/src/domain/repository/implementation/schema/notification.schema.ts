import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Notification } from "../../../entity";

interface _ extends Notification { }

@Entity('notification')
export class NotificationEntity implements _ {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column('text')
    link: string;
}
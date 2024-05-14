import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Notification as NotificationEntity } from "../../domain/entity";

interface _ extends NotificationEntity { }

@Entity('notification')
export class Notification implements _ {
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
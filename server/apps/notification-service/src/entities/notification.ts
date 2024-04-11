import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    title:string;

    @Column("text")
    content:string;

    @Column("date")
    createdAt: Date;

    @Column("text")
    link: string;
}
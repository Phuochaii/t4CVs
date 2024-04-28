// import { Application_Status } from '@app/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  status: boolean;

  @Column('varchar')
  fullname: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { nullable: true })
  coverLetter: string | null;

  @Column({ type: 'date', nullable: true })
  createdAt: string | null;

  @Column({ type: 'date', nullable: true })
  updateAt: string | null;

  @Column('int', { nullable: true })
  campaignId: number | null;

  @Column('int', { nullable: true })
  userId: number | null;

  @Column('int', { nullable: true })
  cvId: number | null;
}

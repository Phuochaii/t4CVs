// import { Application_Status } from '@app/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  status: number;

  @Column('varchar')
  fullname: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { nullable: true })
  coverLetter: string | null;

  @Column('varchar', { nullable: true })
  createdAt: string | null;

  @Column('varchar', { nullable: true })
  updateAt: string | null;

  @Column('int', { nullable: true })
  jobId: number | null;

  @Column('int', { nullable: true })
  userId: number | null;

  @Column('int', { nullable: true })
  cvId: number | null;
}

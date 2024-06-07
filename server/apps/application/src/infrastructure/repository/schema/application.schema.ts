import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Application } from '../../../domain/entity';
import { ClassProperties } from '@app/common/type';

@Entity('application')
export class ApplicationSchema implements ClassProperties<Application> {
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

  @Column({ type: 'timestamp without time zone' })
  createdAt: string;

  @Column({ type: 'timestamp without time zone' })
  updateAt: string;

  @Column('int')
  campaignId: number;

  @Column('varchar')
  userId: string;

  @Column('int')
  cvId: number;
}

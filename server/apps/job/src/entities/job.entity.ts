import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobDetail } from './job-detail.entity';

@Entity({ name: 'job' })
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titleRecruitment: string;

  @Column()
  major: string;

  //field

  @Column()
  compaignId: number;

  //currencyId

  @Column()
  salaryMin: number;

  @Column()
  salaryMax: number;

  @Column()
  exp: number;

  @Column('character varying', { array: true })
  region: string[];

  @Column()
  expriedDate: Date;

  @Column({ default: new Date() })
  createAt: Date;

  @Column({ default: new Date() })
  updateAt: Date;

  //level

  @Column({ default: false })
  status: boolean;

  //companyId

  //jobDetailId
  @OneToOne(() => JobDetail)
  @JoinColumn()
  jobDetail: JobDetail;
}

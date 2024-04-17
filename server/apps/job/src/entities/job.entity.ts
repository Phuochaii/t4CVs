import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { JobDetail } from './job-detail.entity';
import { Major } from './major.entity';
import { Currency } from './currency.entity';
import { Level } from './level.entity';
import { Field } from './field.entity';

@Entity({ name: 'job' })
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titleRecruitment: string;

  @ManyToOne(() => Major)
  @JoinColumn()
  major: Major;

  //field
  @ManyToMany(() => Field)
  @JoinTable()
  fields: Field[];

  @Column()
  compaignId: number;

  //currencyId
  @ManyToOne(() => Currency)
  @JoinColumn()
  currency: Currency;

  @Column()
  salaryMin: number;

  @Column()
  salaryMax: number;

  @Column()
  exp: string;

  @Column('character varying', { array: true })
  region: string[];

  @Column()
  expriedDate: Date;

  @Column({ default: new Date() })
  createAt: Date;

  @Column({ default: new Date() })
  updateAt: Date;

  //level
  @ManyToOne(() => Level)
  @JoinColumn()
  level: Level;

  @Column({ default: false })
  status: boolean;

  //companyId

  //jobDetailId
  @OneToOne(() => JobDetail)
  @JoinColumn()
  jobDetail: JobDetail;
}

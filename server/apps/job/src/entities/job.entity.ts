import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { JobDetail } from './job-detail.entity';
import { Major } from './major.entity';
import { Currency } from './currency.entity';
import { Level } from './level.entity';
import { Field } from './field.entity';
import { Location } from './location.entity';
import { Experience } from './experience.entity';
import { Type } from './type.entity';

@Entity({ name: 'job' })
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titleRecruitment: string;

  @Column()
  majorId: number;

  @ManyToOne(() => Major)
  @JoinColumn()
  major: Major;

  //field
  @ManyToMany(() => Field)
  @JoinTable()
  fields: Field[];

  @Column()
  campaignId: number;

  @Column()
  typeId: number;

  @ManyToOne(() => Type)
  @JoinColumn()
  type: Type;

  @Column()
  currencyId: number;
  //currencyId
  @ManyToOne(() => Currency)
  @JoinColumn()
  currency: Currency;

  @Column()
  salaryMin: number;

  @Column()
  salaryMax: number;

  @Column()
  expId: number;

  @ManyToOne(() => Experience)
  @JoinColumn()
  exp: Experience;

  // @Column('character varying', { array: true })
  // region: string[];
  //location
  @ManyToMany(() => Location)
  @JoinTable()
  locations: Location[];

  @Column()
  expiredDate: Date;

  @Column({ default: new Date() })
  createAt: Date;

  @Column({ default: new Date() })
  updateAt: Date;

  @Column()
  levelId: number;

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

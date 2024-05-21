import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'job_detail' })
export class JobDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  quantity: number;

  @Column()
  jobSchedule: string;

  @Column()
  gender: string;

  @Column()
  description: string;

  @Column()
  benefit: string;
  @Column()
  requirement: string;
  @Column()
  skills: string;
}

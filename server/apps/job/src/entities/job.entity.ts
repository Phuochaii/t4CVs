import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'job' })
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titleRecruitment: string;

  @Column()
  major: string;

  @Column()
  salaryMin: number;

  @Column()
  salaryMax: number;

  @Column({ default: false })
  status: boolean;
}

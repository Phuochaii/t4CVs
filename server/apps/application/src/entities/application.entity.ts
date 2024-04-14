import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  status: string;

  @Column('text')
  fullname: string;

  @CreateDateColumn()
  phone: Date;

  @Column('text')
  email: string;

  @Column('text')
  coverLetter: string;

  @Column('text')
  createAt: string;

  @Column('text')
  updateAt: string;

  @Column('text')
  jobId: number;

  @Column('text')
  userId: number;

  @Column('text')
  cvId: number;
}

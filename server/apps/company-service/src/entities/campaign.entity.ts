import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Campaign' })
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  employerId: number;
}

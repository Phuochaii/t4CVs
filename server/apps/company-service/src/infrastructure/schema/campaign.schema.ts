import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Campaign } from '../../domain/entity';

interface _ extends Campaign {}

@Entity('Campaign')
export class CampaignSchema implements _ {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  employerId: number;
}

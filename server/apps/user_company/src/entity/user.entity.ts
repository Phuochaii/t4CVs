import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id_user: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name_user: string;

  @Column({ type: 'integer', nullable: true })
  id_company: number;

  // @ManyToOne(() => Company, (company) => company.users)
  // @JoinColumn({ name: 'id_company' })
  // company: Company;
}

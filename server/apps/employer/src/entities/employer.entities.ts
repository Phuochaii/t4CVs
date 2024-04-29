import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Position } from './position.entities';
// import { Company } from 'apps/company-service/src/entities/company.entity';

@Entity({ name: 'Employer' })
export class Employer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;
  @Column()
  gender: string;

  @ManyToOne(() => Position)
  @JoinColumn()
  positionId: number;

  @Column({ nullable: true })
  skype: string;

  // @OneToOne(() => Company)
  // @JoinColumn()
  @Column()
  companyId: number;

  @Column()
  license: string;
  @Column()
  phoneNumber: string;
  @Column({ default: false })
  licenseStatus: boolean;
  @Column({ default: false })
  phoneNumberStatus: boolean;
  @Column({ nullable: true })
  image: string;
}

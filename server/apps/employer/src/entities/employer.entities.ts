import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
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

  @OneToOne(() => Position)
  @JoinColumn()
  positionId: number;

  @Column()
  skype: string;

  // @OneToOne(() => Company)
  // @JoinColumn()
  @Column()
  companyId: number;

  @Column()
  license: string;
  @Column()
  phoneNumber: string;
  @Column()
  licenseStatus: boolean;
  @Column()
  phoneNumberStatus: boolean;
  @Column()
  image: string;
}

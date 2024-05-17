import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Employer } from '../../domain/entity';
import { PositionSchema } from './position.schema';

interface _ extends Employer {}

@Entity('Employer')
export class EmployerSchema implements _ {
  @PrimaryColumn()
  id: string;

  @Column()
  fullname: string;
  @Column()
  gender: string;

  @ManyToOne(() => PositionSchema)
  @JoinColumn()
  positionId: number;

  @Column({ nullable: true })
  skype: string;

  @Column({ nullable: true })
  companyId: number;

  @Column({ nullable: true })
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

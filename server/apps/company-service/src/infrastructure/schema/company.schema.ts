import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../domain/entity';

interface _ extends Company {}

@Entity('Company')
export class CompanySchema implements _ {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  field: number;
  @Column()
  taxCode: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  website: string;
  @Column({ nullable: true })
  image: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  companySize: number;
  @Column({ nullable: true })
  description: string;
  @Column({ default: false })
  status: boolean;
}

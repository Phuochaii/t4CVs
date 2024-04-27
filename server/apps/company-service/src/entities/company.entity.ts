import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Company' })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  field: number;
  @Column()
  taxCode: string;
  @Column()
  name: string;
  @Column()
  website: string;
  @Column()
  image: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  companySize: number;
  @Column()
  description: string;
  @Column()
  status: boolean;
}

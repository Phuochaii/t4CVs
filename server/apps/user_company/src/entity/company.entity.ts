import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('company')
export class Company {
  @PrimaryColumn({ type: 'integer' })
  id_company: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name_company: string;

  // @OneToMany(() => User, (user) => user.company)
  // users: User[];
}

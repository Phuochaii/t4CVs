// import { Application_Status } from '@app/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  fullname: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  email: string;

  @Column('int')
  cvId: number;
}

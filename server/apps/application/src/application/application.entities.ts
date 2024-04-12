import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Application')
export class Application {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  fullname: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: number;

  @Column({ type: 'varchar' })
  linkCV: string;
}

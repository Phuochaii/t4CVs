import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  fullname: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  image: string;
}

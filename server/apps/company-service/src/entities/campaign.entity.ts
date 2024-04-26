import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Campaign' })
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  creatednAt: Date;
  @Column()
  employerId: number;
}

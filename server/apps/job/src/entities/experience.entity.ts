import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

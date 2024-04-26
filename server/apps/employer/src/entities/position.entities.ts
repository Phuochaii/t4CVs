import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Position' })
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Position } from '../../domain/entity';

interface _ extends Position {}

@Entity('Position')
export class PositionSchema implements _ {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

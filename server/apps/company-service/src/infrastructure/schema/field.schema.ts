import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field } from '../../domain/entity';

interface _ extends Field {}

@Entity('Field')
export class FieldSchema implements _ {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

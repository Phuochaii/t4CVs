import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../domain/entity';

interface _ extends Cv {}

@Entity('cv')
export class CvSchema implements _ {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  userId: string;

  @Column('int', { nullable: true })
  templateId: number | null;

  @Column('varchar')
  link: string;

  @Column({ type: 'timestamp without time zone' })
  createdAt: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ type: 'timestamp without time zone' })
  lastModified: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../domain/entity';

interface _ extends Cv {}

@Entity('cv')
export class CvSchema implements _ {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: true })
  userId: string | null;

  @Column('int', { nullable: true })
  templateId: number | null;

  @Column('varchar')
  link: string;

  @Column({ type: 'date', nullable: true })
  createdAt: string | null;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ type: 'date', nullable: true })
  lastModified: string | null;
}

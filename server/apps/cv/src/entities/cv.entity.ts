import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CVDto } from '../dto/cv.dto';

@Entity()
@ObjectType()
export class CV {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Unique identifier for the CV' })
  id: number;

  @Column({ nullable: true })
  @Field(() => Int, { description: 'Unique identifier for the user' })
  userId: string;

  @Column({ nullable: true })
  @Field(() => Int, { description: 'Unique identifier for template' })
  templateId: number;

  @Column({ nullable: false })
  @Field(() => String, { description: 'CV data in file format' })
  link: string;

  @Column({ default: true })
  @Field(() => Boolean, { description: 'CV is public or not' })
  isPublic: boolean;

  @CreateDateColumn()
  @Field(() => Date, { description: 'Date when the CV was created' })
  creationAt: Date;

  @UpdateDateColumn({ nullable: true })
  @Field(() => Date, {
    description: 'Date when the CV was last modified',
    nullable: true,
  })
  lastModified?: Date;

  constructor(data?: CVDto) {
    if (data) {
      this.id = data.id;
      this.userId = data.userId;
      this.templateId = data.templateId;
      this.link = data.link;
      this.isPublic = data.isPublic;
      this.creationAt = data.creationAt;
      this.lastModified = data.lastModified;
    }
  }
}

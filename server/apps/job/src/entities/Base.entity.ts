//If we want to hanle generate specific id for entity, use this
import { Column, PrimaryColumn } from 'typeorm';

export class Base {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}

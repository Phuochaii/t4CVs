import { CreateConstTableDTO } from '../dto/Type/const-table';
import { Field } from '../entities';

export abstract class FieldRepository {
  abstract findAll(): Promise<Field[]>;
  abstract findById(id: number): Promise<Field>;
  abstract findOneByName(name: string): Promise<Field>;
  abstract save(createConstTableDT: CreateConstTableDTO): Promise<void>;
}

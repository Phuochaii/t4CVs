import { CreateConstTableDTO } from '../dto/Type/const-table';
import { Type } from '../entities';

export abstract class TypeRepository {
  abstract findAll(): Promise<Type[]>;
  abstract findById(id: number): Promise<Type>;
  abstract findOneByName(name: string): Promise<Type>;
  abstract save(createConstTableDT: CreateConstTableDTO): Promise<void>;
}

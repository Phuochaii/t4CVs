import { CreateConstTableDTO } from '../dto/Type/const-table';
import { Major } from '../entities';

export abstract class MajorRepository {
  abstract findAll(): Promise<Major[]>;
  abstract findById(id: number): Promise<Major>;
  abstract findOneByName(name: string): Promise<Major>;
  abstract save(createConstTableDT: CreateConstTableDTO): Promise<void>;
}

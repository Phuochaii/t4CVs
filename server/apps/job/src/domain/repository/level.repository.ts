import { CreateConstTableDTO } from '../dto/Type/const-table';
import { Level } from '../entities';

export abstract class LevelRepository {
  abstract findAll(): Promise<Level[]>;
  abstract findById(id: number): Promise<Level>;
  abstract findOneByName(name: string): Promise<Level>;
  abstract save(createConstTableDT: CreateConstTableDTO): Promise<void>;
}

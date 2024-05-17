import { CreateConstTableDTO } from '../dto/Type/const-table';
import { Experience } from '../entities';

export abstract class ExperienceRepository {
  abstract findAll(): Promise<Experience[]>;
  abstract findById(id: number): Promise<Experience>;
  abstract findOneByName(name: string): Promise<Experience>;
  abstract save(createConstTableDT: CreateConstTableDTO): Promise<void>;
}

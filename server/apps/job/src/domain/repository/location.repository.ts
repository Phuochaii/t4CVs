import { CreateConstTableDTO } from '../dto/Type/const-table';
import { Location } from '../entities';

export abstract class LocationRepository {
  abstract findAll(): Promise<Location[]>;
  abstract findById(id: number): Promise<Location>;
  abstract findOneByName(name: string): Promise<Location>;
  abstract save(createConstTableDT: CreateConstTableDTO): Promise<void>;
}

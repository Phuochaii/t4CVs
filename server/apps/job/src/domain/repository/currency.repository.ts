import { CreateConstTableDTO } from './../dto/Type/const-table';
import { Currency } from '../entities';

export abstract class CurrencyRepository {
  abstract findAll(): Promise<Currency[]>;
  abstract findById(id: number): Promise<Currency>;
  abstract findOneByName(name: string): Promise<Currency>;
  abstract save(createConstTableDT: CreateConstTableDTO): Promise<void>;
}

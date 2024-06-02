import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from '../../infrastructure/schemas';
import { Repository } from 'typeorm';
import { CreateConstTableDTO } from '../../domain/dto/Type/const-table';
import { CurrencyRepository } from '../../domain/repository';

@Injectable()
export class TypeOrmCurrencyRepository extends CurrencyRepository {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
  ) {
    super();
  }

  async findAll() {
    return this.currencyRepository.find();
  }
  async findById(id: number): Promise<Currency> {
    return this.currencyRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<Currency> {
    return this.currencyRepository.findOneBy({ name });
  }
  async save(createConstTabledto: CreateConstTableDTO): Promise<void> {
    await this.currencyRepository.save(createConstTabledto);
  }
}

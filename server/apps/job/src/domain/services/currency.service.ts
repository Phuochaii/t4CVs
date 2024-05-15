import { Injectable } from '@nestjs/common';
import { Currency } from '../../infrastructure/schemas/currency.schema';
import { CreateBaseDto } from '../../dto/Req/createBase.dto';
import { CurrencyRepository } from '../repository';

@Injectable()
export class CurrencyService {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  findAll() {
    return this.currencyRepository.findAll();
  }
  async findById(id: number): Promise<Currency> {
    return this.currencyRepository.findById(id);
  }

  create(currencies: CreateBaseDto): string {
    currencies.name.map(async (name) => {
      const _currency = await this.currencyRepository.findOneByName(name);
      if (_currency === null) {
        await this.currencyRepository.save({ name });
      }
    });
    return 'Create currency successfully!';
  }
}

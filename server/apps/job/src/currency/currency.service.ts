import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from '../entities/currency.entity';
import { RpcException } from '@nestjs/microservices';
import { CreateBaseDto } from '../dto/Req/createBase.dto';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
  ) {}

  findAll() {
    return this.currencyRepository.find();
  }
  async findById(id: number): Promise<Currency> {
    return this.currencyRepository.findOneBy({ id });
  }

  create(currencies: CreateBaseDto): string {
    currencies.name.map(async (name) => {
      const _currency = await this.currencyRepository.findOne({
        where: { name: name },
      });
      if (_currency === null) {
        await this.currencyRepository.save({ name });
      }
    });
    return 'Create currency successfully!';
  }
}

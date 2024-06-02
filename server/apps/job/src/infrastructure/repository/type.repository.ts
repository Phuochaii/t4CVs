import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from '../schemas';
import { Repository } from 'typeorm';
import { CreateConstTableDTO } from '../../domain/dto/Type/const-table';
import { TypeRepository } from '../../domain/repository';

@Injectable()
export class TypeOrmTypeRepository extends TypeRepository {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {
    super();
  }

  async findAll() {
    return this.typeRepository.find();
  }
  async findById(id: number): Promise<Type> {
    return this.typeRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<Type> {
    return this.typeRepository.findOneBy({ name });
  }
  async save(createConstTabledto: CreateConstTableDTO): Promise<void> {
    await this.typeRepository.save(createConstTabledto);
  }
}

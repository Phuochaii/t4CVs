import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from '../schemas';
import { Repository } from 'typeorm';
import { CreateConstTableDTO } from '../../domain/dto/Type/const-table';
import { FieldRepository } from '../../domain/repository';

@Injectable()
export class TypeOrmFieldRepository extends FieldRepository {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {
    super();
  }

  async findAll() {
    return this.fieldRepository.find();
  }
  async findById(id: number): Promise<Field> {
    return this.fieldRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<Field> {
    return this.fieldRepository.findOneBy({ name });
  }
  async save(createConstTabledto: CreateConstTableDTO): Promise<void> {
    await this.fieldRepository.save(createConstTabledto);
  }
}

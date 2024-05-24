import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Major } from '../schemas';
import { Repository } from 'typeorm';
import { CreateConstTableDTO } from '../../domain/dto/Type/const-table';

@Injectable()
export class TypeOrmMajorRepository {
  constructor(
    @InjectRepository(Major)
    private readonly majorRepository: Repository<Major>,
  ) {}

  async findAll() {
    return this.majorRepository.find();
  }
  async findById(id: number): Promise<Major> {
    return this.majorRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<Major> {
    return this.majorRepository.findOneBy({ name });
  }
  async save(createConstTabledto: CreateConstTableDTO): Promise<void> {
    await this.majorRepository.save(createConstTabledto);
  }
}

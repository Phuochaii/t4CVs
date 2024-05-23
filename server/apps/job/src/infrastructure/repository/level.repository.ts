import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from '../schemas';
import { Repository } from 'typeorm';
import { CreateConstTableDTO } from '../../domain/dto/Type/const-table';

@Injectable()
export class TypeOrmLevelyRepository {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async findAll() {
    return this.levelRepository.find();
  }
  async findById(id: number): Promise<Level> {
    return this.levelRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<Level> {
    return this.levelRepository.findOneBy({ name });
  }
  async save(createConstTabledto: CreateConstTableDTO): Promise<void> {
    await this.levelRepository.save(createConstTabledto);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../schemas';
import { Repository } from 'typeorm';
import { CreateConstTableDTO } from '../../domain/dto/Type/const-table';

@Injectable()
export class TypeOrmLocationRepository {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async findAll() {
    return this.locationRepository.find();
  }
  async findById(id: number): Promise<Location> {
    return this.locationRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<Location> {
    return this.locationRepository.findOneBy({ name });
  }
  async save(createConstTabledto: CreateConstTableDTO): Promise<void> {
    await this.locationRepository.save(createConstTabledto);
  }
}

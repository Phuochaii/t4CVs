import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../schemas';
import { Repository } from 'typeorm';
import { CreateConstTableDTO } from '../../domain/dto/Type/const-table';
import { LocationRepository } from '../../domain/repository';

@Injectable()
export class TypeOrmLocationRepository extends LocationRepository {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {
    super();
  }

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

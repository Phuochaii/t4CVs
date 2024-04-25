import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { CreateBaseDto } from '../dto/Req/createBase.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}
  findAll() {
    return this.locationRepository.find();
  }

  async findById(id: number): Promise<Location> {
    return this.locationRepository.findOneBy({ id });
  }

  create(locations: CreateBaseDto): string {
    locations.name.map(async (name) => {
      const _level = await this.locationRepository.findOne({
        where: { name: name },
      });
      if (_level === null) {
        await this.locationRepository.save({ name });
      }
    });
    return 'Create location successfully!';
  }
}

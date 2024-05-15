import { Injectable } from '@nestjs/common';

import { Location } from '../../infrastructure/schemas/location.schema';
import { CreateBaseDto } from '../../domain/dto/Req/createBase.dto';
import { LocationRepository } from '../repository';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}
  findAll() {
    return this.locationRepository.findAll();
  }

  async findById(id: number): Promise<Location> {
    return this.locationRepository.findById(id);
  }

  create(locations: CreateBaseDto): string {
    locations.name.map(async (name) => {
      const _level = await this.locationRepository.findOneByName(name);
      if (_level === null) {
        await this.locationRepository.save({ name });
      }
    });
    return 'Create location successfully!';
  }
}

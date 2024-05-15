import { Injectable } from '@nestjs/common';
import { Experience } from '../../infrastructure/schemas/experience.schema';
import { CreateBaseDto } from '../../dto/Req/createBase.dto';
import { ExperienceRepository } from '../repository';

@Injectable()
export class ExperienceService {
  constructor(private readonly experienceRepository: ExperienceRepository) {}
  findAll() {
    return this.experienceRepository.findAll();
  }
  async findById(id: number): Promise<Experience> {
    return this.experienceRepository.findById(id);
  }

  create(experiences: CreateBaseDto): string {
    experiences.name.map(async (name) => {
      const _currency = await this.experienceRepository.findOneByName(name);
      if (_currency === null) {
        await this.experienceRepository.save({ name });
      }
    });
    return 'Create experience successfully!';
  }
}

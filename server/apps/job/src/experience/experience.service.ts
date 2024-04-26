import { Injectable } from '@nestjs/common';
import { Experience } from '../entities/experience.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBaseDto } from '../dto/Req/createBase.dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}
  findAll() {
    return this.experienceRepository.find();
  }
  async findById(id: number): Promise<Experience> {
    return this.experienceRepository.findOneBy({ id });
  }

  create(experiences: CreateBaseDto): string {
    experiences.name.map(async (name) => {
      const _currency = await this.experienceRepository.findOne({
        where: { name: name },
      });
      if (_currency === null) {
        await this.experienceRepository.save({ name });
      }
    });
    return 'Create experience successfully!';
  }
}

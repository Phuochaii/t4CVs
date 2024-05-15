import { Injectable } from '@nestjs/common';
import { Major } from '../../infrastructure/schemas/major.schema';
import { CreateBaseDto } from '../../domain/dto/Req/createBase.dto';
import { MajorRepository } from '../repository';

export class MajorService {
  constructor(private majorRepository: MajorRepository) {}

  async findAll(): Promise<Major[]> {
    return this.majorRepository.findAll();
  }

  async findById(id: number): Promise<Major> {
    return this.majorRepository.findById(id);
  }

  create(majors: CreateBaseDto): string {
    majors.name.map(async (name) => {
      const _major = await this.majorRepository.findOneByName(name);
      if (_major === null) {
        await this.majorRepository.save({ name });
      }
    });
    return 'Create major successfully!';
  }
}

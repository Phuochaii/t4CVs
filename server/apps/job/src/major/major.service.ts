import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Major } from '../entities/major.entity';

@Injectable()
export class MajorService {
  constructor(
    @InjectRepository(Major)
    private majorRepository: Repository<Major>,
  ) {}

  async findAll(): Promise<Major[]> {
    return this.majorRepository.find();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entities'; // Sử dụng tên import đúng

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectRepository(Application) // Sử dụng tên Entity đúng
    private readonly applicationRepository: Repository<Application>, // Sử dụng tên Entity đúng
  ) {}

  async create(doc: Partial<Application>): Promise<Application> {
    const newApplication = this.applicationRepository.create(doc);
    return await this.applicationRepository.save(newApplication);
  }

  async getAll(): Promise<Application[]> {
    return this.applicationRepository.find();
  }
}

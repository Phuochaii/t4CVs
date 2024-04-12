import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './application.dto';
import { ApplicationRepository } from './application.repository';

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async addApplication(createApplicationDto: CreateApplicationDto) {
    return await this.applicationRepository.create(createApplicationDto);
  }

  async getAllApplication() {
    return this.applicationRepository.getAll();
  }
}

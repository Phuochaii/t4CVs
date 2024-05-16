import { BaseService } from './base.service';
import { ApplicationRepository } from '../repository';
import { Application } from '../entity';

export class GetAllApplicationService implements BaseService<Application[]> {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async execute(ApplicationDto): Promise<Application[]> {
    const getApplication =
      await this.applicationRepository.getAllApplication(ApplicationDto);
    return getApplication;
  }
}

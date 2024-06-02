import { BaseService } from './base.service';
import { ApplicationRepository } from '../repository';
import { Application } from '../entity';

export class GetApplicationService implements BaseService<Application> {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async execute(ApplicationDto): Promise<Application | null> {
    const getApplication =
      await this.applicationRepository.getApplication(ApplicationDto);
    return getApplication;
  }
}

import { BaseService } from './base.service';
import { ApplicationRepository } from '../repository';
import { Application } from '../entity';

export class UpdateApplicationService implements BaseService<Application> {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async execute(ApplicationDto): Promise<Application | null> {
    const updateApplication =
      await this.applicationRepository.updateApplication(ApplicationDto);
    return updateApplication;
  }
}

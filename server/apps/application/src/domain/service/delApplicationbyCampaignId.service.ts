import { BaseService } from './base.service';
import { ApplicationRepository } from '../repository';
import { Application } from '../entity';

export class DelApplicationService implements BaseService<Application> {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async execute(ApplicationDto) {
    const getApplication =
      await this.applicationRepository.delApplicationbyCampaignId(
        ApplicationDto,
      );
    return getApplication;
  }
}

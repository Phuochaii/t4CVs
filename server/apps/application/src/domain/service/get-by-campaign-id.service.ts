import { BaseService } from '@app/common/domain';
import { Application } from '../entity';
import { GetByCampaignIdDto } from '../dto';
import { ApplicationReadRepository } from '../repository';

export class GetByCampaignIdService implements BaseService<Application[]> {
  constructor(private readonly applicationRepository: ApplicationReadRepository) {}

  async execute(request: GetByCampaignIdDto): Promise<Application[] | null> {
    const getApplication =
      await this.applicationRepository.getByCampaignIdApplication(request);
    return getApplication;
  }
}

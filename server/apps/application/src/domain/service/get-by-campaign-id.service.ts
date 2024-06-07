import { BaseService } from '@app/common/domain';
import { ApplicationRepository } from '../repository';
import { Application } from '../entity';
import { GetByCampaignIdDto } from '../dto';

export class GetByCampaignIdService implements BaseService<Application[]> {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async execute(request: GetByCampaignIdDto): Promise<Application[] | null> {
    const getApplication =
      await this.applicationRepository.readRepository.getByCampaignIdApplication(request);
    return getApplication;
  }
}

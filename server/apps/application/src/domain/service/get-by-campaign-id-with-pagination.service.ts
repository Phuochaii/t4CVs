import { BaseService } from '@app/common/domain';
import { ApplicationRepository } from '../repository';
import { Application } from '../entity';

export class GetByCampaignIdWithPaginationService
  implements BaseService<Application[]>
{
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async execute(ApplicationDto): Promise<Application[] | null> {
    const getApplication =
      await this.applicationRepository.getByCampaignIdApplicationWithPagination(
        ApplicationDto,
      );
    return getApplication;
  }
}

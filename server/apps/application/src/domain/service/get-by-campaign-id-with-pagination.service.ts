import { BaseService } from '@app/common/domain';
import { Application } from '../entity';
import { ApplicationReadRepository } from '../repository';

export class GetByCampaignIdWithPaginationService
  implements BaseService<Application[]>
{
  constructor(private readonly applicationRepository: ApplicationReadRepository) {}

  async execute(ApplicationDto): Promise<Application[] | null> {
    const getApplication =
      await this.applicationRepository.getByCampaignIdApplicationWithPagination(
        ApplicationDto,
      );
    return getApplication;
  }
}

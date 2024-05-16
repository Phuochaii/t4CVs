import { Campaign } from '../../entity';
import { CampaignRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetAllCampaignByEmployerIdPaginationService
  implements BaseService<Campaign[]>
{
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async execute(
    employerId: string,
    page: number,
    limit: number,
  ): Promise<Campaign[]> {
    const campaigns =
      await this.campaignRepository.getCampaignByEmployerIdPagination(
        employerId,
        page,
        limit,
      );

    return campaigns;
  }
}

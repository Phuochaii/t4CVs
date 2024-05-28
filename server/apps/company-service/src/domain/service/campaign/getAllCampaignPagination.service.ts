import { Campaign } from '../../entity';
import { CampaignRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetAllCampaignPaginationService
  implements BaseService<Campaign[]>
{
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async execute(page: number, limit: number): Promise<Campaign[]> {
    const campaigns = await this.campaignRepository.getAllCampaignPagination(
      page,
      limit,
    );

    return campaigns;
  }
}

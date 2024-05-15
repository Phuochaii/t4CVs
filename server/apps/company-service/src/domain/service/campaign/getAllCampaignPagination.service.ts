import { GetCampaignDTO } from '../../dto';
import { CampaignRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetAllCampaignPaginationService
  implements BaseService<GetCampaignDTO[]>
{
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async execute(page: number, limit: number): Promise<GetCampaignDTO[]> {
    const campaigns = await this.campaignRepository.getAllCampaignPagination(
      page,
      limit,
    );

    return campaigns;
  }
}

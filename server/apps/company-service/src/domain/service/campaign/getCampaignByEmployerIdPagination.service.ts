import { GetCampaignDTO } from '../../dto';
import { CampaignRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetAllCampaignByEmployerIdPaginationService
  implements BaseService<GetCampaignDTO[]>
{
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async execute(
    employerId: number,
    page: number,
    limit: number,
  ): Promise<GetCampaignDTO[]> {
    const campaigns =
      await this.campaignRepository.getCampaignByEmployerIdPagination(
        employerId,
        page,
        limit,
      );

    return campaigns;
  }
}

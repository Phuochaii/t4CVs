import { GetCampaignDTO } from '../../dto';
import { CampaignRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetAllCampaignByEmployerIdService
  implements BaseService<GetCampaignDTO[]>
{
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async execute(employerId: number): Promise<GetCampaignDTO[]> {
    const campaigns =
      await this.campaignRepository.getCampaignByEmployerId(employerId);

    return campaigns;
  }
}

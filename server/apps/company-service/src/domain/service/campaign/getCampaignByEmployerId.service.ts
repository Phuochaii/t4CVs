import { Campaign } from '../../entity';
import { CampaignRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetAllCampaignByEmployerIdService
  implements BaseService<Campaign[]>
{
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async execute(employerId: number): Promise<Campaign[]> {
    const campaigns =
      await this.campaignRepository.getCampaignByEmployerId(employerId);

    return campaigns;
  }
}

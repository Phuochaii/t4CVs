import { CampaignRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetTotalCampaignByEmployerIdService
  implements BaseService<number>
{
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async execute(employerId: string): Promise<number> {
    const total =
      await this.campaignRepository.getTotalCampaignByEmployerId(employerId);

    return total;
  }
}

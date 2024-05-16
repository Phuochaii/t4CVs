import { CampaignRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetTotalCampaignsService implements BaseService<number> {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async execute(): Promise<number> {
    const total = await this.campaignRepository.getTotalCampaigns();

    return total;
  }
}

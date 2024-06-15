import { CampaignRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetTotalCampaignByNameService implements BaseService<number> {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  execute(name: string): Promise<number> {
    const total = this.campaignRepository.getTotalCampaignByName(name);

    return total;
  }
}

import { Campaign } from '../../entity';
import { CampaignRepository } from '../../repository';
import { BaseService } from '../base.service';

export class FindCampaignByIdService implements BaseService<Campaign> {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  execute(id: number): Promise<Campaign> {
    const result = this.campaignRepository.findCampaignById(id);

    return result;
  }
}

import { Campaign } from '../../entity';
import { CampaignRepository } from '../../repository';
import { UpdateCampaignDTO } from '../../dto';
import { BaseService } from '../base.service';

export class UpdateCampaignService implements BaseService<Campaign> {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  execute(campaign: UpdateCampaignDTO): Promise<Campaign> {
    const result = this.campaignRepository.updateCampaign(campaign);

    return result;
  }
}

import { CreateCampaignDTO } from '../../dto';
import { Campaign } from '../../entity';
import { CampaignRepository } from '../../repository';
import { BaseService } from '../base.service';

export class CreateCampaignService implements BaseService<Campaign> {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  execute(campaign: CreateCampaignDTO): Promise<Campaign> {
    const createdCampaign = this.campaignRepository.createCampaign(campaign);

    return createdCampaign;
  }
}

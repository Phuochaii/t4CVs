import { CampaignRepository } from '../../repository';
import { BaseService } from '../base.service';

export class DeleteCampaignService implements BaseService<string> {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  execute(id: number): Promise<string> {
    return this.campaignRepository.deleteCampaign(id);
  }
}

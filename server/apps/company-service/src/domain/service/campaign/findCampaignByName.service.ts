import { Campaign } from '../../entity';
import { CampaignRepository } from '../../repository';
import { BaseService } from '../base.service';

export class FindCampaignByNameService implements BaseService<Campaign[]> {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  execute(name: string, page: number, limit: number): Promise<Campaign[]> {
    const result = this.campaignRepository.findCampaignByName(
      name,
      page,
      limit,
    );

    return result;
  }
}

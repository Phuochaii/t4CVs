import { PaginationRequest } from '@app/common/dto/pagination';
import { CreateCampaignDTO, GetCampaignDTO } from '../dto';
import { Campaign } from '../entity';

export abstract class CampaignRepository {
  abstract createCampaign(campaign: CreateCampaignDTO): Promise<Campaign>;

  abstract getAllCampaign(
    pagination: PaginationRequest,
  ): Promise<GetCampaignDTO[]>;
}

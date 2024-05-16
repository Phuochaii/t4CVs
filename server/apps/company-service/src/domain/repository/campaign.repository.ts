import { CreateCampaignDTO, UpdateCampaignDTO } from '../dto';
import { Campaign } from '../entity';

export abstract class CampaignRepository {
  abstract createCampaign(campaign: CreateCampaignDTO): Promise<Campaign>;

  abstract getAllCampaignPagination(
    page: number,
    limit: number,
  ): Promise<Campaign[]>;

  abstract getTotalCampaigns(): Promise<number>;

  abstract findCampaignById(id: number): Promise<Campaign>;

  abstract updateCampaign(campaign: UpdateCampaignDTO): Promise<Campaign>;

  abstract getCampaignByEmployerId(employerId: string): Promise<Campaign[]>;

  abstract getCampaignByEmployerIdPagination(
    employerId: string,
    page: number,
    limit: number,
  ): Promise<Campaign[]>;

  abstract getTotalCampaignByEmployerId(employerId: string): Promise<number>;
}

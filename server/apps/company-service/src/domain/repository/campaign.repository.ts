import { CreateCampaignDTO, GetCampaignDTO, UpdateCampaignDTO } from '../dto';
import { Campaign } from '../entity';

export abstract class CampaignRepository {
  abstract createCampaign(campaign: CreateCampaignDTO): Promise<Campaign>;

  abstract getAllCampaignPagination(
    page: number,
    limit: number,
  ): Promise<GetCampaignDTO[]>;

  abstract getTotalCampaigns(): Promise<number>;

  abstract findCampaignById(id: number): Promise<Campaign>;

  abstract updateCampaign(campaign: UpdateCampaignDTO): Promise<Campaign>;

  abstract getCampaignByEmployerId(
    employerId: number,
  ): Promise<GetCampaignDTO[]>;

  abstract getCampaignByEmployerIdPagination(
    employerId: number,
    page: number,
    limit: number,
  ): Promise<GetCampaignDTO[]>;

  abstract getTotalCampaignByEmployerId(employerId: number): Promise<number>;
}

import { InjectRepository } from '@nestjs/typeorm';
import { CampaignRepository } from '../../domain/repository';
import { Repository } from 'typeorm';
import { CampaignSchema } from '../schema';
import { Campaign } from '../../domain/entity';
import { CreateCampaignDTO, UpdateCampaignDTO } from '../../domain/dto';

export class TypeOrmCampaignRepository extends CampaignRepository {
  constructor(
    @InjectRepository(CampaignSchema)
    private readonly campaignRepository: Repository<CampaignSchema>,
  ) {
    super();
  }

  async createCampaign(campaign: CreateCampaignDTO): Promise<Campaign> {
    return await this.campaignRepository.save(campaign);
  }

  async getAllCampaignPagination(
    page: number,
    limit: number,
  ): Promise<Campaign[]> {
    const skip = (page - 1) * limit;

    const campaigns = await this.campaignRepository.find({
      skip: skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return campaigns;
  }

  async getTotalCampaigns(): Promise<number> {
    const total = await this.campaignRepository.count();

    return total;
  }

  async findCampaignById(id: number): Promise<Campaign> {
    const result = await this.campaignRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }

  async updateCampaign(campaign: UpdateCampaignDTO): Promise<Campaign> {
    await this.campaignRepository.update(campaign.id, {
      name: campaign.name,
    });

    return await this.findCampaignById(campaign.id);
  }

  async getCampaignByEmployerId(employerId: string): Promise<Campaign[]> {
    const campaigns = await this.campaignRepository.find({
      where: { employerId: employerId },
      order: {
        createdAt: 'DESC',
      },
    });
    return campaigns;
  }

  async getCampaignByEmployerIdPagination(
    employerId: string,
    page: number,
    limit: number,
  ): Promise<Campaign[]> {
    const skip = (page - 1) * limit;
    const campaigns = await this.campaignRepository.find({
      where: { employerId: employerId },
      skip: skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return campaigns;
  }

  async getTotalCampaignByEmployerId(employerId: string): Promise<number> {
    const total = await this.campaignRepository.count({
      where: { employerId: employerId },
    });

    return total;
  }

  async deleteCampaign(id: number): Promise<string> {
    const result = await this.campaignRepository.delete(id);

    if (result.affected === 0) {
      return 'Delete Campaign Fail';
    } else {
      return 'Delete Campaign Success';
    }
  }
}

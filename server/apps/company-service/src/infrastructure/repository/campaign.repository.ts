import { InjectRepository } from '@nestjs/typeorm';
import { CampaignRepository } from '../../domain/repository';
import { Repository } from 'typeorm';
import { CampaignSchema } from '../schema';
import { PaginationRequest } from '@app/common/dto/pagination';
import { CreateCampaignDTO, GetCampaignDTO } from '../../domain/dto';
import { Campaign } from '../../domain/entity';

export class TypeOrmCampaignRepository extends CampaignRepository {
  constructor(
    @InjectRepository(CampaignSchema)
    private readonly campaignRepository: Repository<CampaignSchema>,
  ) {
    super();
  }

  createCampaign(campaign: CreateCampaignDTO): Promise<Campaign> {
    throw new Error('Method not implemented.');
  }
  getAllCampaign(pagination: PaginationRequest): Promise<GetCampaignDTO[]> {
    throw new Error('Method not implemented.');
  }
}

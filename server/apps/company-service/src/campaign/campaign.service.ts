import { Injectable } from '@nestjs/common';
import { Campaign } from '../entities/campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCampaignDto } from '../dto/Req/create-campaign.dto';
import { FindCampaignDTOResponse } from '../dto/Res/find-campaign.dto';
import { UpdateCampaignDto } from '../dto/Req/update-campaign.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private CampaignRepository: Repository<Campaign>,
  ) {}

  async createCampaign(createCampaignDto: CreateCampaignDto) {
    const now = new Date();
    createCampaignDto.creatednAt = now;
    const campaign = await this.CampaignRepository.save(createCampaignDto);

    return await this.CampaignRepository.save(campaign);
  }

  // eslint-disable-next-line prettier/prettier
  async findAllCampaigns(
    page: number,
    limit: number,
  ): Promise<FindCampaignDTOResponse[]> {
    const skip = (page - 1) * limit;
    const campaigns = await this.CampaignRepository.find({
      skip: skip,
      take: limit,
      order: {
        creatednAt: 'DESC',
      },
    });
    return campaigns;
  }

  async findCampaignById(id: number) {
    const result = await this.CampaignRepository.findOne({
      where: {
        id,
      },
    });
    return result;
  }

  async updateCampaign(data: UpdateCampaignDto) {
    return await this.CampaignRepository.update(data.id, {
      name: data.name,
      creatednAt: data.creatednAt,
      employerId: data.employerId,
    });
  }

  // async findEmployerId(id: number) {
  //   const result = await this.CampaignRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  //   return result.employerId;
  // }
}

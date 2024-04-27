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
    createCampaignDto.createdAt = now;
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
        createdAt: 'DESC',
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
      createdAt: data.createdAt,
      employerId: data.employerId,
    });
  }

  async findCampaignByEmployerId(employerId: number) {
    const result = await this.CampaignRepository.find({
      where: { employerId: employerId },
      order: {
        createdAt: 'DESC',
      },
    });

    return result;
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

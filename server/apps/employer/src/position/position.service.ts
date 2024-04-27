import { Injectable } from '@nestjs/common';
import { Position } from '../entities/position.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindPositionDTOResponse } from '../dto/Res/find_position.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private PositionRepository: Repository<Position>,
  ) {}

  // async createCampaign(createCampaignDto: CreateCampaignDto) {
  //   const campaign = await this.CampaignRepository.save(createCampaignDto);

  //   return await this.CampaignRepository.save(campaign);
  // }

  // eslint-disable-next-line prettier/prettier
  async findAllPositions(): Promise<FindPositionDTOResponse[]> {
    const positions = await this.PositionRepository.find();
    return positions;
  }

  async findPositionById(id: number) {
    const result = await this.PositionRepository.findOne({
      where: {
        id,
      },
    });
    return result;
  }

  // async updateCampaign(data: UpdateCampaignDto) {
  //   return await this.CampaignRepository.update(data.id, {
  //     name: data.name,
  //     creatednAt: data.creatednAt,
  //     employerId: data.employerId,
  //   });
  // }

  // async findEmployerId(id: number) {
  //   const result = await this.CampaignRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  //   return result.employerId;
  // }
}

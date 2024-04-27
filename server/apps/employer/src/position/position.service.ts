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
}

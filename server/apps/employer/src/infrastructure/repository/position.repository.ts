import { InjectRepository } from '@nestjs/typeorm';
import { PositionRepository } from '../../domain/repository';
import { PositionSchema } from '../schema';
import { Position } from '../../domain/entity';
import { Repository } from 'typeorm';

export class TypeOrmPositionRepository extends PositionRepository {
  constructor(
    @InjectRepository(PositionSchema)
    private readonly positionRepository: Repository<PositionSchema>,
  ) {
    super();
  }

  async getAllPosition(): Promise<Position[]> {
    const positions = await this.positionRepository.find();

    return positions;
  }

  async getPositionById(id: number): Promise<Position> {
    const result = await this.positionRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}

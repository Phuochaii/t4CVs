import { Position } from '../../entity';
import { PositionRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetPositionByIdService implements BaseService<Position> {
  constructor(private readonly positionRepository: PositionRepository) {}

  execute(id: number): Promise<Position> {
    const position = this.positionRepository.getPositionById(id);

    return position;
  }
}

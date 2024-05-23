import { Position } from '../../entity';
import { PositionRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetPositionService implements BaseService<Position[]> {
  constructor(private readonly positionRepository: PositionRepository) {}

  execute(): Promise<Position[]> {
    const positions = this.positionRepository.getAllPosition();

    return positions;
  }
}

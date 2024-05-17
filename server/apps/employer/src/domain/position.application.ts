import { Position } from './entity';
import { GetPositionByIdService, GetPositionService } from './service';

export class PositionApplication {
  constructor(
    private readonly getAllPositionService: GetPositionService,
    private readonly getPositionByIdService: GetPositionByIdService,
  ) {}

  async getAllPosition(): Promise<Position[]> {
    return await this.getAllPositionService.execute();
  }

  async getPositionById(id: number): Promise<Position> {
    return await this.getPositionByIdService.execute(id);
  }
}

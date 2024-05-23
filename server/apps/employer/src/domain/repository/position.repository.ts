import { Position } from '../entity';

export abstract class PositionRepository {
  abstract getAllPosition(): Promise<Position[]>;

  abstract getPositionById(id: number): Promise<Position>;
}

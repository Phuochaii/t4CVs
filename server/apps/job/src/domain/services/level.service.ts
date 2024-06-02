import { Level } from '../../infrastructure/schemas/level.schema';
import { CreateBaseDto } from '../../domain/dto/Req/createBase.dto';
import { LevelRepository } from '../repository';

export class LevelService {
  constructor(private readonly levelRepository: LevelRepository) {}
  findAll() {
    return this.levelRepository.findAll();
  }

  async findById(id: number): Promise<Level> {
    return this.levelRepository.findById(id);
  }

  create(levels: CreateBaseDto): string {
    levels.name.map(async (name) => {
      const _level = await this.levelRepository.findOneByName(name);
      if (_level === null) {
        await this.levelRepository.save({ name });
      }
    });
    return 'Create level successfully!';
  }
}

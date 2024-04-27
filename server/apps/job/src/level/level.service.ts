import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from '../entities/level.entity';
import { RpcException } from '@nestjs/microservices';
import { CreateBaseDto } from '../dto/Req/createBase.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}
  findAll() {
    return this.levelRepository.find();
  }

  async findById(id: number): Promise<Level> {
    return this.levelRepository.findOneBy({ id });
  }

  create(levels: CreateBaseDto): string {
    levels.name.map(async (name) => {
      const _level = await this.levelRepository.findOne({
        where: { name: name },
      });
      if (_level === null) {
        await this.levelRepository.save({ name });
      }
    });
    return 'Create level successfully!';
  }
}

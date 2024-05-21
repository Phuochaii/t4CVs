import { Injectable } from '@nestjs/common';
import { Type } from '../entities/type.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBaseDto } from '../dto/Req/createBase.dto';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}
  findAll() {
    return this.typeRepository.find();
  }

  async findById(id: number): Promise<Type> {
    return this.typeRepository.findOneBy({ id });
  }

  create(types: CreateBaseDto): string {
    types.name.map(async (name) => {
      const _level = await this.typeRepository.findOne({
        where: { name: name },
      });
      if (_level === null) {
        await this.typeRepository.save({ name });
      }
    });
    return 'Create type of job successfully!';
  }
}

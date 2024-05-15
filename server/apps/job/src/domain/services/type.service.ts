import { Injectable } from '@nestjs/common';
import { Type } from '../../infrastructure/schemas/type.schema';
import { CreateBaseDto } from '../../domain/dto/Req/createBase.dto';
import { TypeRepository } from '../repository';

@Injectable()
export class TypeService {
  constructor(private readonly typeRepository: TypeRepository) {}
  findAll() {
    return this.typeRepository.findAll();
  }

  async findById(id: number): Promise<Type> {
    return this.typeRepository.findById(id);
  }

  create(types: CreateBaseDto): string {
    types.name.map(async (name) => {
      const _level = await this.typeRepository.findOneByName(name);
      if (_level === null) {
        await this.typeRepository.save({ name });
      }
    });
    return 'Create type of job successfully!';
  }
}

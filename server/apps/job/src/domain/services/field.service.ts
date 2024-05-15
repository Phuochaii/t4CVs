import { Injectable } from '@nestjs/common';
import { Field } from '../../infrastructure/schemas/field.schema';
import { CreateBaseDto } from '../../domain/dto/Req/createBase.dto';
import { FieldRepository } from '../repository';

@Injectable()
export class FieldService {
  constructor(private readonly fieldRepository: FieldRepository) {}
  create(fields: CreateBaseDto): string {
    fields.name.map(async (name) => {
      const _field = await this.fieldRepository.findOneByName(name);
      if (_field === null) {
        await this.fieldRepository.save({ name });
      }
    });
    return 'Create field successfully!';
  }

  findAll() {
    return this.fieldRepository.findAll();
  }
  async findById(id: number): Promise<Field> {
    return this.fieldRepository.findById(id);
  }
}

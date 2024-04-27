import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Field } from '../entities/field.entity';
import { RpcException } from '@nestjs/microservices';
import { CreateBaseDto } from '../dto/Req/createBase.dto';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {}
  create(fields: CreateBaseDto): string {
    fields.name.map(async (name) => {
      const _field = await this.fieldRepository.findOne({
        where: { name: name },
      });
      if (_field === null) {
        await this.fieldRepository.save({ name });
      }
    });
    return 'Create field successfully!';
  }

  findAll() {
    return this.fieldRepository.find();
  }
  async findById(id: number): Promise<Field> {
    return this.fieldRepository.findOneBy({ id });
  }
}

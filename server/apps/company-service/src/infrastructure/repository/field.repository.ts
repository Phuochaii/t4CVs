import { Repository } from 'typeorm';
import { FieldRepository } from '../../domain/repository';
import { FieldSchema } from '../schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from '../../domain/entity';

export class TypeOrmFieldRepository extends FieldRepository {
  constructor(
    @InjectRepository(FieldSchema)
    private readonly fieldRepository: Repository<FieldSchema>,
  ) {
    super();
  }

  async getAllField(): Promise<Field[]> {
    const fields = await this.fieldRepository.find({
      order: {
        id: 'ASC',
      },
    });

    return fields;
  }

  async findFieldById(id: number): Promise<Field> {
    const result = await this.fieldRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}

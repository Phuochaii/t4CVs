import { Field } from '../../entity';
import { FieldRepository } from '../../repository';
import { BaseService } from '../base.service';

export class FindFieldByIdService implements BaseService<Field> {
  constructor(private readonly fieldRepository: FieldRepository) {}

  execute(id: number): Promise<Field> {
    const result = this.fieldRepository.findFieldById(id);

    return result;
  }
}

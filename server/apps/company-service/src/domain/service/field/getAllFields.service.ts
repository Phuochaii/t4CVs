import { Field } from '../../entity';
import { FieldRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetAllFieldService implements BaseService<Field[]> {
  constructor(private readonly fieldRepository: FieldRepository) {}

  execute(): Promise<Field[]> {
    const result = this.fieldRepository.getAllField();

    return result;
  }
}

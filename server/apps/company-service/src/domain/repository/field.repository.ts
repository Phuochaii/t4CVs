import { Field } from '../entity';

export abstract class FieldRepository {
  abstract getAllField(): Promise<Field[]>;

  abstract findFieldById(id: number): Promise<Field>;
}

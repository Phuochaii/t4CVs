import { Field } from './entity';
import { FindFieldByIdService, GetAllFieldService } from './service';

export class FieldApplication {
  constructor(
    private readonly findFieldByIdService: FindFieldByIdService,
    private readonly getAllFieldService: GetAllFieldService,
  ) {}

  async getAllField(): Promise<Field[]> {
    return await this.getAllFieldService.execute();
  }

  async findFieldById(id: number): Promise<Field> {
    return await this.findFieldByIdService.execute(id);
  }
}

import { BaseService } from './base.service';
import { CvRepository } from '../repository';
import { Cv } from '../entity';

export class GetAllCvService implements BaseService<Cv[]> {
  constructor(private readonly cvRepository: CvRepository) {}

  async execute(): Promise<Cv[]> {
    const getApplication = await this.cvRepository.getAllCv();
    return getApplication;
  }
}

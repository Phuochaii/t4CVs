import { BaseService } from './base.service';
import { CvRepository } from '../repository';
import { Cv } from '../entity';

export class GetArrayCvService implements BaseService<Cv[]> {
  constructor(private readonly cvRepository: CvRepository) {}

  async execute(CvDto): Promise<Cv[]> {
    const getApplication = await this.cvRepository.getCvs(CvDto);
    return getApplication;
  }
}

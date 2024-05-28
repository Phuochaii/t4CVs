import { BaseService } from './base.service';
import { CvRepository } from '../repository';
import { Cv } from '../entity';

export class GetCvService implements BaseService<Cv> {
  constructor(private readonly cvRepository: CvRepository) {}

  async execute(CvDto): Promise<Cv> {
    const getApplication = await this.cvRepository.getCv(CvDto);
    return getApplication;
  }
}

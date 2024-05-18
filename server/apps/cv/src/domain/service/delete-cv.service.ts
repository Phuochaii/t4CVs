import { BaseService } from './base.service';
import { CvRepository } from '../repository';
import { Cv } from '../entity';

export class DeleteCvService implements BaseService<Cv> {
  constructor(private readonly cvRepository: CvRepository) {}

  async execute(CvDto): Promise<Cv> {
    const delCv = await this.cvRepository.deleteCv(CvDto);
    return delCv;
  }
}

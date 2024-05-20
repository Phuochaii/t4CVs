import { BaseService } from './base.service';
import { CvRepository } from '../repository';
import { Cv } from '../entity';
// import { ApplicationDto } from '../dto';

export class UpdateCvService implements BaseService<Cv> {
  constructor(private readonly cvRepository: CvRepository) {}

  async execute(CvDto): Promise<Cv> {
    const updateApplication = await this.cvRepository.updateCv(CvDto);
    return updateApplication;
  }
}

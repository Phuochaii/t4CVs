import { BaseService } from './base.service';
import { CvRepository } from '../repository';
import { Cv } from '../entity';
// import { ApplicationDto } from '../dto';

export class CreateCvService implements BaseService<Cv> {
  constructor(private readonly cvRepository: CvRepository) {}

  async execute(CvDto): Promise<Cv> {
    const now = new Date();
    CvDto.createdAt = now.toISOString();
    CvDto.lastModified = now.toISOString();
    CvDto.isPublic = false;
    const createdApplication = await this.cvRepository.createApplication(CvDto);
    return createdApplication;
  }
}

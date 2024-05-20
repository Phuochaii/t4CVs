import { InjectRepository } from '@nestjs/typeorm';
import { CvRepository } from '../../domain/repository';
import { CvSchema } from '../schema';
import { Repository } from 'typeorm';
import { CvDto, UpdateCvDto, GetCvDto } from '../../domain/dto';
import { Cv } from '../../domain/entity';

export class TypeOrmCvRepository extends CvRepository {
  constructor(
    @InjectRepository(CvSchema)
    private readonly cvRepository: Repository<CvSchema>,
  ) {
    super();
  }

  async createCv(cv: CvDto): Promise<Cv> {
    return await this.cvRepository.save(cv);
  }

  async updateCv(cv: UpdateCvDto): Promise<any> {
    const now = new Date();
    const lastModified = now.toISOString();
    await this.cvRepository.update(cv.id, {
      link: cv.link,
      isPublic: cv.isPublic,
      lastModified: lastModified,
    });
    return 'success';
  }

  async getCv(cv: GetCvDto): Promise<any> {
    return await this.cvRepository.findOneBy(cv);
  }

  async getAllCv(): Promise<Cv[]> {
    return await this.cvRepository.find();
  }

  async deleteCv(cv: GetCvDto): Promise<Cv> {
    const CV = await this.cvRepository.findOneBy(cv);
    await this.cvRepository.delete(cv);
    return CV;
  }
}

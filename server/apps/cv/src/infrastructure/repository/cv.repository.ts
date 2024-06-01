import { InjectRepository } from '@nestjs/typeorm';
import { CvRepository } from '../../domain/repository';
import { CvSchema } from '../schema';
import { Repository, In } from 'typeorm';
import { CvDto, UpdateCvDto, GetCvDto, GetArrayCvDto } from '../../domain/dto';
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
      isPublic: cv.isPublic,
      lastModified: lastModified,
    });
    return await this.cvRepository.findOneBy(cv);
  }

  async getCv(cv: GetCvDto): Promise<any> {
    return await this.cvRepository.findOneBy(cv);
  }

  async getCvs(cv: GetArrayCvDto): Promise<any[]> {
    const data = await this.cvRepository.find({
      where: {
        id: In(cv.id),
      },
    });

    const orderedData = cv.id.map((id) => data.find((item) => item.id === id));
    return orderedData;
  }

  async getAllCv(): Promise<Cv[]> {
    return await this.cvRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async deleteCv(cv: GetCvDto): Promise<Cv> {
    const CV = await this.cvRepository.findOneBy(cv);
    await this.cvRepository.delete(cv);
    return CV;
  }
}

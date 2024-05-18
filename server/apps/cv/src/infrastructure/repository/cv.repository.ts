import { InjectRepository } from '@nestjs/typeorm';
import { CvRepository } from '../../domain/repository';
import { CvSchema } from '../schema';
import { In, Repository } from 'typeorm';
import { CvDto, CreateCvDto } from '../../domain/dto';
import { Cv } from '../../domain/entity';

export class TypeOrmCvRepository extends CvRepository {
  constructor(
    @InjectRepository(CvSchema)
    private readonly cvRepository: Repository<CvSchema>,
  ) {
    super();
  }

  async createApplication(cv: CvDto): Promise<Cv> {
    return await this.cvRepository.save(cv);
  }
}

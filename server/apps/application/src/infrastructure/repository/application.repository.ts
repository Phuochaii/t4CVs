import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRepository } from '../../domain/repository';
import { ApplicationSchema } from '../schema';
import { Repository } from 'typeorm';
import { ApplicationDto } from '../../domain/dto';
import { Application } from '../../domain/entity';

export class TypeOrmApplicationRepository extends ApplicationRepository {
  constructor(
    @InjectRepository(ApplicationSchema)
    private readonly applicationRepository: Repository<ApplicationSchema>,
  ) {
    super();
  }

  async createApplication(application: ApplicationDto): Promise<Application> {
    return await this.applicationRepository.save(application);
  }
}

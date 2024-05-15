import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from '../../domain/repository';
import { Repository } from 'typeorm';
import { Campaign } from '../schema';

export class TypeOrmCompanyRepository extends CompanyRepository {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {
    super();
  }
}

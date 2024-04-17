import { DataSource, Repository } from 'typeorm';
import { Company } from '../entity/company.entity';

export class CompanyRepository extends Repository<Company> {
  constructor(dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }
}
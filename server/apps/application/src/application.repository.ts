import { DataSource, Repository } from 'typeorm';
import { Application } from './entities/application.entity';

export class ApplicationRepository extends Repository<Application> {
  constructor(dataSource: DataSource) {
    super(Application, dataSource.createEntityManager());
  }
}

// export class ApplicationRepository extends Repository<Application> {
//   constructor(dataSource: DataSource) {
//     super(Application, dataSource.createEntityManager());
//   }
// }

import { Injectable } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationRepository {
  private readonly applicationRepository: Repository<Application>;

  constructor() {
    this.applicationRepository = getRepository(Application);
  }

  async create(doc): Promise<any> {
    const newApplication = this.applicationRepository.create({
      ...doc,
    });
    return await this.applicationRepository.save(newApplication);
  }

  async find(doc): Promise<any> {
    return await this.applicationRepository.find(doc);
  }
}

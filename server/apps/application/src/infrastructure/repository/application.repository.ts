import { ApplicationRepository } from '../../domain/repository';
import { TypeOrmApplicationWriteRepository } from './application.write.repository';
import { TypeOrmApplicationReadRepository } from './application.read.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmApplicationRepository extends ApplicationRepository {
  constructor(
    writeRepository: TypeOrmApplicationWriteRepository,
    readRepository: TypeOrmApplicationReadRepository,
  ) {
    super(writeRepository, readRepository);
  }
}

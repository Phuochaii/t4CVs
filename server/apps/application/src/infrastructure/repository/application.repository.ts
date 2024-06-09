import { ApplicationRepository } from '../../domain/repository';
import { TypeOrmApplicationReadRepository } from './read/application.read.repository';
import { TypeOrmApplicationWriteRepository } from './write/application.write.repository';
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

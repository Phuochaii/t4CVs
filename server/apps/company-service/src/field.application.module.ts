import { Module } from '@nestjs/common';
import { FieldApplication } from './domain';
import { CompanyPersistenceModule } from './infrastructure/company.persistence.module';
import { FindFieldByIdService, GetAllFieldService } from './domain/service';
import { FieldRepository } from './domain/repository';

@Module({
  imports: [CompanyPersistenceModule],
  providers: [
    {
      provide: FindFieldByIdService,
      useFactory: (fieldRepository: FieldRepository) => {
        return new FindFieldByIdService(fieldRepository);
      },
      inject: [FieldRepository],
    },
    {
      provide: GetAllFieldService,
      useFactory: (fieldRepository: FieldRepository) => {
        return new GetAllFieldService(fieldRepository);
      },
      inject: [FieldRepository],
    },
    {
      provide: FieldApplication,
      useFactory: (
        findFieldByIdService: FindFieldByIdService,
        getAllFieldService: GetAllFieldService,
      ) => {
        return new FieldApplication(findFieldByIdService, getAllFieldService);
      },
      inject: [FindFieldByIdService, GetAllFieldService],
    },
  ],
  exports: [FieldApplication],
})
export class FieldApplicationModule {}

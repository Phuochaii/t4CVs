import { Module } from '@nestjs/common';
import { CompanyPersistenceModule } from './infrastructure/company.persistence.module';
import { CreateCompanyService } from './domain/service';
import { CompanyRepository } from './domain/repository';
import { CompanyApplication } from './domain';

@Module({
  imports: [CompanyPersistenceModule],
  providers: [
    {
      provide: CreateCompanyService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new CreateCompanyService(companyRepository);
      },
      inject: [CompanyRepository],
    },
    {
      provide: CompanyApplication,
      useFactory: (createCompanyService: CreateCompanyService) => {
        return new CompanyApplication(createCompanyService);
      },
      inject: [CreateCompanyService],
    },
  ],
  exports: [CompanyApplication],
})
export class CompanyApplicationModule {}

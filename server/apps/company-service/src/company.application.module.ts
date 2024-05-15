import { Module } from '@nestjs/common';
import { CompanyPersistenceModule } from './infrastructure/company.persistence.module';
import {
  CreateCompanyService,
  GetAllCompanyPaginationService,
  GetTotalCompaniesService,
} from './domain/service';
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
      provide: GetAllCompanyPaginationService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new GetAllCompanyPaginationService(companyRepository);
      },
      inject: [CompanyRepository],
    },
    {
      provide: GetTotalCompaniesService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new GetTotalCompaniesService(companyRepository);
      },
      inject: [CompanyRepository],
    },
    {
      provide: CompanyApplication,
      useFactory: (
        createCompanyService: CreateCompanyService,
        getAllCompanyPaginationService: GetAllCompanyPaginationService,
        getTotalCompanies: GetTotalCompaniesService,
      ) => {
        return new CompanyApplication(
          createCompanyService,
          getAllCompanyPaginationService,
          getTotalCompanies,
        );
      },
      inject: [
        CreateCompanyService,
        GetAllCompanyPaginationService,
        GetTotalCompaniesService,
      ],
    },
  ],
  exports: [CompanyApplication],
})
export class CompanyApplicationModule {}

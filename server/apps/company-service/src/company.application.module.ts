import { Module } from '@nestjs/common';
import { CompanyPersistenceModule } from './infrastructure/company.persistence.module';
import { CompanyRepository } from './domain/repository';
import { CompanyApplication } from './domain';
import {
  CreateCompanyService,
  FindCompanyByIdService,
  GetAllCompanyPaginationService,
  GetTotalCompaniesService,
  RemoveCompanyService,
  UpdateCompanyService,
} from './domain/service';

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
      provide: FindCompanyByIdService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new FindCompanyByIdService(companyRepository);
      },
      inject: [CompanyRepository],
    },
    {
      provide: UpdateCompanyService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new UpdateCompanyService(companyRepository);
      },
      inject: [CompanyRepository],
    },
    {
      provide: RemoveCompanyService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new RemoveCompanyService(companyRepository);
      },
      inject: [CompanyRepository],
    },
    {
      provide: CompanyApplication,
      useFactory: (
        createCompanyService: CreateCompanyService,
        getAllCompanyPaginationService: GetAllCompanyPaginationService,
        getTotalCompanies: GetTotalCompaniesService,
        findCompanyById: FindCompanyByIdService,
        updateCompany: UpdateCompanyService,
        removeCompany: RemoveCompanyService,
      ) => {
        return new CompanyApplication(
          createCompanyService,
          getAllCompanyPaginationService,
          getTotalCompanies,
          findCompanyById,
          updateCompany,
          removeCompany,
        );
      },
      inject: [
        CreateCompanyService,
        GetAllCompanyPaginationService,
        GetTotalCompaniesService,
        FindCompanyByIdService,
        UpdateCompanyService,
        RemoveCompanyService,
      ],
    },
  ],
  exports: [CompanyApplication],
})
export class CompanyApplicationModule {}

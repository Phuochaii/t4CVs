import { Module } from '@nestjs/common';
import { CompanyPersistenceModule } from './infrastructure/company.persistence.module';
import { CompanyRepository } from './domain/repository';
import { CompanyApplication } from './domain';
import {
  CreateCompanyService,
  FindCompanyByArrayIdService,
  FindCompanyByIdService,
  FindCompanyByNameService,
  GetAllCompanyPaginationService,
  GetTotalCompaniesService,
  RemoveCompanyService,
  UpdateCompanyService,
  UpdateCompanyStatusService,
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
      provide: UpdateCompanyStatusService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new UpdateCompanyStatusService(companyRepository);
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
      provide: FindCompanyByArrayIdService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new FindCompanyByArrayIdService(companyRepository);
      },
      inject: [CompanyRepository],
    },
    {
      provide: FindCompanyByNameService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new FindCompanyByNameService(companyRepository);
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
        updateCompanyStatus: UpdateCompanyStatusService,
        removeCompany: RemoveCompanyService,
        findCompanyByArrayId: FindCompanyByArrayIdService,
        findCompanyByNameService: FindCompanyByNameService,
      ) => {
        return new CompanyApplication(
          createCompanyService,
          getAllCompanyPaginationService,
          getTotalCompanies,
          findCompanyById,
          updateCompany,
          updateCompanyStatus,
          removeCompany,
          findCompanyByArrayId,
          findCompanyByNameService,
        );
      },
      inject: [
        CreateCompanyService,
        GetAllCompanyPaginationService,
        GetTotalCompaniesService,
        FindCompanyByIdService,
        UpdateCompanyService,
        UpdateCompanyStatusService,
        RemoveCompanyService,
        FindCompanyByArrayIdService,
        FindCompanyByNameService,
      ],
    },
  ],
  exports: [CompanyApplication],
})
export class CompanyApplicationModule {}

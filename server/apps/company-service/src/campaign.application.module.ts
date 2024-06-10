import { Module } from '@nestjs/common';
import { CompanyPersistenceModule } from './infrastructure/company.persistence.module';
import { CampaignRepository } from './domain/repository';
import { CampaignApplication } from './domain';
import {
  CreateCampaignService,
  DeleteCampaignService,
  FindCampaignByIdService,
  FindCampaignByNameService,
  GetAllCampaignByEmployerIdPaginationService,
  GetAllCampaignByEmployerIdService,
  GetAllCampaignPaginationService,
  GetTotalCampaignByEmployerIdService,
  GetTotalCampaignByNameService,
  GetTotalCampaignsService,
  UpdateCampaignService,
} from './domain/service';

@Module({
  imports: [CompanyPersistenceModule],
  providers: [
    {
      provide: CreateCampaignService,
      useFactory: (campaignRepository: CampaignRepository) => {
        return new CreateCampaignService(campaignRepository);
      },
      inject: [CampaignRepository],
    },
    {
      provide: GetAllCampaignPaginationService,
      useFactory: (campaignRepository: CampaignRepository) => {
        return new GetAllCampaignPaginationService(campaignRepository);
      },
      inject: [CampaignRepository],
    },
    {
      provide: GetTotalCampaignsService,
      useFactory: (campaignRepository: CampaignRepository) => {
        return new GetTotalCampaignsService(campaignRepository);
      },
      inject: [CampaignRepository],
    },
    {
      provide: UpdateCampaignService,
      useFactory: (campaignRepository: CampaignRepository) => {
        return new UpdateCampaignService(campaignRepository);
      },
      inject: [CampaignRepository],
    },
    {
      provide: FindCampaignByIdService,
      useFactory: (campaignRepository: CampaignRepository) => {
        return new FindCampaignByIdService(campaignRepository);
      },
      inject: [CampaignRepository],
    },
    {
      provide: GetAllCampaignByEmployerIdService,
      useFactory: (campaignRepository: CampaignRepository) => {
        return new GetAllCampaignByEmployerIdService(campaignRepository);
      },
      inject: [CampaignRepository],
    },
    {
      provide: GetAllCampaignByEmployerIdPaginationService,
      useFactory: (campaignRepository: CampaignRepository) => {
        return new GetAllCampaignByEmployerIdPaginationService(
          campaignRepository,
        );
      },
      inject: [CampaignRepository],
    },
    {
      provide: GetTotalCampaignByEmployerIdService,
      useFactory: (campaignRepository: CampaignRepository) => {
        return new GetTotalCampaignByEmployerIdService(campaignRepository);
      },
      inject: [CampaignRepository],
    },
    {
      provide: DeleteCampaignService,
      useFactory: (campaignRepository: CampaignRepository) => {
        return new DeleteCampaignService(campaignRepository);
      },
      inject: [CampaignRepository],
    },
    {
      provide: FindCampaignByNameService,
      useFactory: (campaignRepository: CampaignRepository) => {
        return new FindCampaignByNameService(campaignRepository);
      },
      inject: [CampaignRepository],
    },
    {
      provide: GetTotalCampaignByNameService,
      useFactory: (campaignRepository: CampaignRepository) => {
        return new GetTotalCampaignByNameService(campaignRepository);
      },
      inject: [CampaignRepository],
    },
    {
      provide: CampaignApplication,
      useFactory: (
        createCampaign: CreateCampaignService,
        getAllCampaignPagination: GetAllCampaignPaginationService,
        getTotalCampaigns: GetTotalCampaignsService,
        findCampaignById: FindCampaignByIdService,
        updateCampaign: UpdateCampaignService,
        getAllCampaignByEmployerId: GetAllCampaignByEmployerIdService,
        getAllCampaignByEmployerIdPagination: GetAllCampaignByEmployerIdPaginationService,
        getTotalCampaignByEmployerId: GetTotalCampaignByEmployerIdService,
        deleteCampaignService: DeleteCampaignService,
        findCampaignByNameService: FindCampaignByNameService,
        getTotalCampaignByNameService: GetTotalCampaignByNameService,
      ) => {
        return new CampaignApplication(
          createCampaign,
          getAllCampaignPagination,
          getTotalCampaigns,
          findCampaignById,
          updateCampaign,
          getAllCampaignByEmployerId,
          getAllCampaignByEmployerIdPagination,
          getTotalCampaignByEmployerId,
          deleteCampaignService,
          findCampaignByNameService,
          getTotalCampaignByNameService,
        );
      },
      inject: [
        CreateCampaignService,
        GetAllCampaignPaginationService,
        GetTotalCampaignsService,
        FindCampaignByIdService,
        UpdateCampaignService,
        GetAllCampaignByEmployerIdService,
        GetAllCampaignByEmployerIdPaginationService,
        GetTotalCampaignByEmployerIdService,
        DeleteCampaignService,
        FindCampaignByNameService,
        GetTotalCampaignByNameService,
      ],
    },
  ],
  exports: [CampaignApplication],
})
export class CampaignApplicationModule {}

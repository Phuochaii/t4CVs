import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CampaignApplication,
  CompanyApplication,
  FieldApplication,
} from './domain';
import {
  CreateCampaignDTO,
  CreateCompanyDTO,
  UpdateCampaignDTO,
  UpdateCompanyDTO,
  UpdateCompanyStatusDTO,
} from './domain/dto';

@Controller()
export class CompanyServiceController {
  constructor(
    private readonly companyApplication: CompanyApplication,
    private readonly campaignApplication: CampaignApplication,
    private readonly fieldApplication: FieldApplication,
  ) {}

  @MessagePattern({ cmd: 'create_company' })
  createCompany(company: CreateCompanyDTO) {
    return this.companyApplication.createCompany(company);
  }

  @MessagePattern({ cmd: 'get_all_companies' })
  async findAllCompanies(@Payload() data: any) {
    const page = Number(data.page);
    const limit = Number(data.limit);
    const total = await this.companyApplication.getTotalCompanies();
    const total_page = Math.ceil(total / limit);
    const data_find = await this.companyApplication.getAllCompanyPagination(
      page,
      limit,
    );

    const result = {
      page: page,
      limit: limit,
      total: total,
      total_page: total_page,
      data: data_find,
    };

    return result;
  }

  @MessagePattern({ cmd: 'find_company_by_id' })
  async findCompanyById(id: number) {
    return await this.companyApplication.findCompanyById(id);
  }

  @MessagePattern({ cmd: 'update_company' })
  async updateCompany(data: UpdateCompanyDTO) {
    return this.companyApplication.updateCompany(data);
  }

  @MessagePattern({ cmd: 'update_company_status' })
  async updateCompanyStatus(data: UpdateCompanyStatusDTO) {
    return this.companyApplication.updateCompanyStatus(data);
  }

  @MessagePattern({ cmd: 'remove_company' })
  removeCompany(id: number) {
    return this.companyApplication.removeCompany(id);
  }

  @MessagePattern({ cmd: 'find_company_by_array_id' })
  async findCompanyByArrayId(id: number[]) {
    return await this.companyApplication.findCompanyByArrayId(id);
  }

  @MessagePattern({ cmd: 'create_campaign' })
  createCampaign(campaign: CreateCampaignDTO) {
    return this.campaignApplication.createCampaign(campaign);
  }

  @MessagePattern({ cmd: 'get_all_campaigns' })
  async findAllCampaign(@Payload() data: any) {
    const page = Number(data.page);
    const limit = Number(data.limit);
    const total = await this.campaignApplication.getTotalCampaigns();
    const total_page = Math.ceil(total / limit);
    const data_find = await this.campaignApplication.getAllCampaignPagination(
      page,
      limit,
    );

    const result = {
      page: page,
      limit: limit,
      total: total,
      total_page: total_page,
      data: data_find,
    };

    return result;
  }

  @MessagePattern({ cmd: 'find_campaign_by_id' })
  findCampaignById(id: number) {
    return this.campaignApplication.findCampaignById(id);
  }

  @MessagePattern({ cmd: 'update_campaign' })
  updateCampaign(data: UpdateCampaignDTO) {
    return this.campaignApplication.updateCampaign(data);
  }

  @MessagePattern({ cmd: 'find_campaign_by_employerId' })
  async findCampaignByEmployerId(@Payload() data: any) {
    const employerId = String(data.employerId);
    const page = Number(data.page);
    const limit = Number(data.limit);

    const total = Number(
      await this.campaignApplication.getTotalCampaignByEmployerId(employerId),
    );
    const total_page = Math.ceil(total / limit);

    const data_find =
      await this.campaignApplication.getAllCampaignByEmployerIdPagination(
        employerId,
        page,
        limit,
      );

    const result = {
      page: page,
      limit: limit,
      total: total,
      total_page: total_page,
      data: data_find,
    };

    return result;
  }

  @MessagePattern({ cmd: 'find_all_campaign_by_employerid' })
  findAllCampaignByEmployerId(employerId: string) {
    return this.campaignApplication.getAllCampaignByEmployerId(employerId);
  }

  @MessagePattern({ cmd: 'get_all_field' })
  getAllField() {
    return this.fieldApplication.getAllField();
  }

  @MessagePattern({ cmd: 'find_field_by_id' })
  findFieldById(id: number) {
    return this.fieldApplication.findFieldById(id);
  }
}

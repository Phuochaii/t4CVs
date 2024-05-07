import { Controller } from '@nestjs/common';
import { CompanyServiceService } from './company-service.service';
import { CampaignService } from '../campaign/campaign.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCompanyDto } from '../dto/Req/create-company.dto';
import { UpdateCompanyDto } from '../dto/Req/update-company.dto';
import { CreateCampaignDto } from '../dto/Req/create-campaign.dto';
import { UpdateCampaignDto } from '../dto/Req/update-campaign.dto';
// import { FindCompanyDTOResponse } from './dto/Res/find-company.dto';

@Controller()
export class CompanyServiceController {
  constructor(
    private readonly companyServiceService: CompanyServiceService,
    private readonly campaignService: CampaignService,
  ) {}

  @MessagePattern({ cmd: 'create_company' })
  createCompany(company: CreateCompanyDto) {
    this.companyServiceService.createCompany(company);
    return 'Company created successfully!';
  }

  @MessagePattern({ cmd: 'get_all_companies' })
  async findAllCompanies(@Payload() data: any) {
    const page = Number(data.page);
    const limit = Number(data.limit);

    const total = Number(await this.campaignService.getTotalCampaign());
    const total_page = Math.ceil(total / limit);
    // eslint-disable-next-line prettier/prettier
    const data_find = await this.companyServiceService.findAllCompanies(page, limit);

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
  findCompanyById(id: number) {
    return this.companyServiceService.findCompanyById(id);
  }

  @MessagePattern({ cmd: 'update_company' })
  updateCompany(data: UpdateCompanyDto) {
    this.companyServiceService.updateCompany(data);
    return 'Company update successfully!';
  }

  @MessagePattern({ cmd: 'remove_company' })
  removeCompany(id: number) {
    return this.companyServiceService.removeCompany(id);
  }

  @MessagePattern({ cmd: 'create_campaign' })
  createCampaign(campaign: CreateCampaignDto) {
    return this.campaignService.createCampaign(campaign);
  }

  @MessagePattern({ cmd: 'get_all_campaigns' })
  async findAllCampaign(@Payload() data: any) {
    const page = Number(data.page);
    const limit = Number(data.limit);

    const total = Number(await this.campaignService.getTotalCampaign());
    const total_page = Math.ceil(total / limit);
    const data_find = await this.campaignService.findAllCampaigns(page, limit);

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
    return this.campaignService.findCampaignById(id);
  }

  @MessagePattern({ cmd: 'update_campaign' })
  updateCampaign(data: UpdateCampaignDto) {
    this.campaignService.updateCampaign(data);
    return 'Company update successfully!';
  }

  @MessagePattern({ cmd: 'find_campaign_by_employerId' })
  async findCampaignByEmployerId(@Payload() data: any) {
    const employerId = Number(data.employerId);
    const page = Number(data.page);
    const limit = Number(data.limit);

    const total = Number(
      await this.campaignService.getTotalCampaignByEmployerId(employerId),
    );
    const total_page = Math.ceil(total / limit);

    const data_find = await this.campaignService.findCampaignByEmployerId(
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
    // return this.campaignService.findCampaignByEmployerId(employerId);
  }

  @MessagePattern({ cmd: 'find_all_campaign_by_employerid' })
  findAllCampaignByEmployerId(employerId: number) {
    return this.campaignService.findAllCampaignByEmployerId(employerId);
  }
}

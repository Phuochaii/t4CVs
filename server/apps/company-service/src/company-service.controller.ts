import { Controller } from '@nestjs/common';
import { CompanyServiceService } from './company-service.service';
import { CampaignService } from './campaign/campaign.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCompanyDto } from './dto/Req/create-company.dto';
import { UpdateCompanyDto } from './dto/Req/update-company.dto';
import { CreateCampaignDto } from './dto/Req/create-campaign.dto';
import { UpdateCampaignDto } from './dto/Req/update-campaign.dto';
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
  findAllCompanies(page: number = 1) {
    return this.companyServiceService.findAllCompanies(page);
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
    this.campaignService.createCampaign(campaign);
    return 'Campaign created successfully!';
  }

  @MessagePattern({ cmd: 'get_all_campaigns' })
  findAllCampaign(page: number = 1) {
    return this.campaignService.findAllCampaigns(page);
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

  // @MessagePattern({ cmd: 'find_employerid' })
  // findEmployerId(id: number) {
  //   return this.campaignService.findEmployerId(id);
  // }
}

import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCompanyDto } from './dto/Req/createCompany.dto';
import { UpdateCompanyDto } from './dto/Req/updateCompany.dto';
import { CreateCampaignDto } from './dto/Req/createCampaign.dto';
import { UpdateCampaignDto } from './dto/Req/updateCampaign.dto';
import { FindCampaignDTOResponse } from './dto/Res/find-campaign.dto';
import { FindCompanyDTOResponse } from './dto/Res/find-company.dto';
import { UpdateCompanyStatusDto } from './dto/Req/updateCompanyStatus.dto';

@Injectable()
export class CompanyService {
  constructor(@Inject('COMPANY') private readonly companyClient: ClientProxy) {}

  createCompany(createCompanyDTO: CreateCompanyDto): Observable<string> {
    return this.companyClient.send({ cmd: 'create_company' }, createCompanyDTO);
  }

  getAllCompanies(page: number, limit: number): Observable<string> {
    return this.companyClient.send(
      { cmd: 'get_all_companies' },
      { page, limit },
    );
  }

  findCompanyById(id: number) {
    return this.companyClient.send<FindCompanyDTOResponse>(
      { cmd: 'find_company_by_id' },
      id,
    );
  }

  findCompanyByArrayId(id: number[]): Observable<any[]> {
    return this.companyClient.send({ cmd: 'find_company_by_array_id' }, id);
  }

  updateCompany(data: UpdateCompanyDto): Observable<string> {
    return this.companyClient.send({ cmd: 'update_company' }, data);
  }

  updateCompanyStatus(data: UpdateCompanyStatusDto): Observable<string> {
    return this.companyClient.send({ cmd: 'update_company_status' }, data);
  }

  removeCompany(id: number): Observable<string> {
    return this.companyClient.send({ cmd: 'remove_company' }, id);
  }

  createCampaign(createCampaignDTO: CreateCampaignDto): Observable<string> {
    return this.companyClient.send(
      { cmd: 'create_campaign' },
      createCampaignDTO,
    );
  }

  getAllCampaigns(page: number, limit: number): Observable<string> {
    return this.companyClient.send(
      { cmd: 'get_all_campaigns' },
      { page, limit },
    );
  }

  findCampaignById(id: number) {
    return this.companyClient.send<FindCampaignDTOResponse, number>(
      { cmd: 'find_campaign_by_id' },
      id,
    );
  }

  updateCampaign(data: UpdateCampaignDto): Observable<string> {
    return this.companyClient.send({ cmd: 'update_campaign' }, data);
  }

  findCampaignByEmployerId(employerId: string, page: number, limit: number) {
    return this.companyClient.send<{ data: FindCampaignDTOResponse[] }>(
      { cmd: 'find_campaign_by_employerId' },
      { employerId, page, limit },
    );
  }

  findAllCampaignByEmployerId(employerId: string) {
    return this.companyClient.send<{ data: FindCampaignDTOResponse[] }>(
      { cmd: 'find_all_campaign_by_employerid' },
      employerId,
    );
  }

  getAllField() {
    return this.companyClient.send({ cmd: 'get_all_field' }, {});
  }

  findFieldById(id: number) {
    return this.companyClient.send({ cmd: 'find_field_by_id' }, id);
  }
}

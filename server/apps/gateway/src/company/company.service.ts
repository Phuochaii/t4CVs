import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCompanyDto } from './dto/Req/createCompany.dto';
import { UpdateCompanyDto } from './dto/Req/updateCompany.dto';
import { CreateCampaignDto } from './dto/Req/createCampaign.dto';
import { UpdateCampaignDto } from './dto/Req/updateCampaign.dto';

@Injectable()
export class CompanyService {
  constructor(@Inject('COMPANY') private readonly companyClient: ClientProxy) {}

  createCompany(createCompanyDTO: CreateCompanyDto): Observable<string> {
    return this.companyClient.send({ cmd: 'create_company' }, createCompanyDTO);
  }

  getAllCompanies(page: number): Observable<string> {
    return this.companyClient.send({ cmd: 'get_all_companies' }, page);
  }

  findCompanyById(id: number): Observable<string> {
    return this.companyClient.send({ cmd: 'find_company_by_id' }, id);
  }

  updateCompany(data: UpdateCompanyDto): Observable<string> {
    return this.companyClient.send({ cmd: 'update_company' }, data);
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

  getAllCampaigns(page: number): Observable<string> {
    return this.companyClient.send({ cmd: 'get_all_campaigns' }, page);
  }

  findCampaignById(id: number): Observable<string> {
    return this.companyClient.send({ cmd: 'find_campaign_by_id' }, id);
  }

  updateCampaign(data: UpdateCampaignDto): Observable<string> {
    return this.companyClient.send({ cmd: 'update_campaign' }, data);
  }

  // findEmployerId(id: number): Observable<string> {
  //   return this.companyClient.send({ cmd: 'find_employerid' }, id);
  // }
}

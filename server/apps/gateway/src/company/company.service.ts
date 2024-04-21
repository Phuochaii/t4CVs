import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/Req/createCompany.dto';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateCompanyDto } from './dto/Req/updateCompany.dto';

@Injectable()
export class CompanyService {
  constructor(@Inject('COMPANY') private readonly companyClient: ClientProxy) {}

  createCompany(createCompanyDTO: CreateCompanyDto): Observable<string> {
    return this.companyClient.send({ cmd: 'create_company' }, createCompanyDTO);
  }

  getAllCompanies(): Observable<string> {
    return this.companyClient.send({ cmd: 'get_all_companies' }, {});
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
}

import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEmployerDto } from 'apps/employer/src/dto/Req/create-employer.dto';
import { FindEmployerDTOResponse } from 'apps/employer/src/dto/Res/find_employer.dto';

@Injectable()
export class EmployerService {
  constructor(
    @Inject('EMPLOYER') private readonly employerClient: ClientProxy,
  ) {}

  //   createCompany(createCompanyDTO: CreateCompanyDto): Observable<string> {
  //     return this.companyClient.send({ cmd: 'create_company' }, createCompanyDTO);
  //   }

  createEmployer(createEmployerDTO: CreateEmployerDto): Observable<string> {
    return this.employerClient.send(
      { cmd: 'create_employer' },
      createEmployerDTO,
    );
  }

  getAllEmployers(): Observable<string> {
    return this.employerClient.send({ cmd: 'get_all_employers' }, {});
  }

  findEmployerById(id: number): Observable<FindEmployerDTOResponse> {
    return this.employerClient.send<FindEmployerDTOResponse>({ cmd: 'find_employer_by_id' }, id);
  }

  //   updateCompany(data: UpdateCompanyDto): Observable<string> {
  //     return this.companyClient.send({ cmd: 'update_company' }, data);
  //   }

  //   removeCompany(id: number): Observable<string> {
  //     return this.companyClient.send({ cmd: 'remove_company' }, id);
  //   }

  //   createCampaign(createCampaignDTO: CreateCampaignDto): Observable<string> {
  //     return this.companyClient.send(
  //       { cmd: 'create_campaign' },
  //       createCampaignDTO,
  //     );
  //   }

  getAllPositions(): Observable<string> {
    return this.employerClient.send({ cmd: 'get_all_positions' }, {});
  }

  findPositionById(id: number): Observable<string> {
    return this.employerClient.send({ cmd: 'find_position_by_id' }, id);
  }

  //   updateCampaign(data: UpdateCampaignDto): Observable<string> {
  //     return this.companyClient.send({ cmd: 'update_campaign' }, data);
  //   }

  // findEmployerId(id: number): Observable<string> {
  //   return this.companyClient.send({ cmd: 'find_employerid' }, id);
  // }
}

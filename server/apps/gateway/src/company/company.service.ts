import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  Observable,
  catchError,
  forkJoin,
  from,
  lastValueFrom,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCompanyDto } from './dto/Req/createCompany.dto';
import { UpdateCompanyDto } from './dto/Req/updateCompany.dto';
import { CreateCampaignDto } from './dto/Req/createCampaign.dto';
import { UpdateCampaignDto } from './dto/Req/updateCampaign.dto';
import { FindCampaignDTOResponse } from './dto/Res/find-campaign.dto';
import { FindCompanyDTOResponse } from './dto/Res/find-company.dto';
import { UpdateCompanyStatusDto } from './dto/Req/updateCompanyStatus.dto';
import { EmployerService } from '../employer/employer.service';
import { UploadService } from '../upload/upload.service';
import { UpdateEmployerCompanyDTO } from '../employer/dto/Req/updateEmployerCompany.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY') private readonly companyClient: ClientProxy,
    private readonly employerService: EmployerService,
    private readonly uploadService: UploadService,
  ) {}

  async createCompany(
    file: any,
    createCompanyDTO: CreateCompanyDto,
    employerId: string,
  ) {
    if (file) {
      const uploadLink$ = from(this.uploadService.upload(file));

      return uploadLink$.pipe(
        switchMap(async (img: string) => {
          createCompanyDTO.image = img;

          const company = await lastValueFrom(
            this.companyClient.send<FindCompanyDTOResponse>(
              { cmd: 'create_company' },
              createCompanyDTO,
            ),
          );

          const updateEmployerCompanyDTO: UpdateEmployerCompanyDTO = {
            id: employerId,
            companyId: company.id,
          };

          lastValueFrom(
            this.employerService.updateEmployerCompanyId(
              updateEmployerCompanyDTO,
            ),
          );

          return company;
        }),
      );
    } else {
      const company = await lastValueFrom(
        this.companyClient.send<FindCompanyDTOResponse>(
          { cmd: 'create_company' },
          createCompanyDTO,
        ),
      );

      const updateEmployerCompanyDTO: UpdateEmployerCompanyDTO = {
        id: employerId,
        companyId: company.id,
      };

      lastValueFrom(
        this.employerService.updateEmployerCompanyId(updateEmployerCompanyDTO),
      );

      return company;
    }
  }

  getAllCompanies(page: number, limit: number): Observable<string> {
    return this.companyClient.send(
      { cmd: 'get_all_companies' },
      { page, limit },
    );
  }

  findCompanyById(id: number) {
    const company$ = this.companyClient
      .send<FindCompanyDTOResponse>({ cmd: 'find_company_by_id' }, id)
      .pipe(
        catchError((error) => {
          return throwError(() => error.response);
        }),
      );

    const employers$ = this.employerService.getEmployerByCompanyId(id);

    return forkJoin([company$, employers$]).pipe(
      map(([company, employers]) => {
        const result = {
          ...company,
          employers: employers,
        };
        return result;
      }),
    );
  }

  findCompanyByArrayId(id: number[]): Observable<any[]> {
    return this.companyClient.send({ cmd: 'find_company_by_array_id' }, id);
  }

  async updateCompany(file: any, data: UpdateCompanyDto, employerId: string) {
    const employerOfCompany = await lastValueFrom(
      this.employerService.getEmployerByCompanyId(data.id),
    );

    let check: boolean = false;
    employerOfCompany.forEach((employer) => {
      if (employer.id === employerId) {
        check = true;
      }
    });

    if (check) {
      if (file) {
        const uploadLink$ = from(this.uploadService.upload(file));

        return uploadLink$.pipe(
          switchMap((img: string) => {
            data.image = img;

            return this.companyClient
              .send({ cmd: 'update_company' }, data)
              .pipe(
                catchError((error) => {
                  return throwError(() => error.response);
                }),
              );
          }),
        );
      } else {
        return this.companyClient.send({ cmd: 'update_company' }, data).pipe(
          catchError((error) => {
            return throwError(() => error.response);
          }),
        );
      }
    } else {
      throw new BadRequestException('Employer do not belong to the company');
    }
  }

  updateCompanyStatus(data: UpdateCompanyStatusDto): Observable<string> {
    return this.companyClient.send({ cmd: 'update_company_status' }, data).pipe(
      catchError((error) => {
        return throwError(() => error.response);
      }),
    );
  }

  removeCompany(id: number): Observable<string> {
    return this.companyClient.send({ cmd: 'remove_company' }, id);
  }

  findCompanyByName(name: string, page: number, limit: number) {
    return this.companyClient
      .send({ cmd: 'find_company_by_name' }, { name, page, limit })
      .pipe(
        catchError((error) => {
          return throwError(() => error.response);
        }),
      );
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
    return this.companyClient
      .send<FindCampaignDTOResponse, number>({ cmd: 'find_campaign_by_id' }, id)
      .pipe(
        catchError((error) => {
          return throwError(() => error.response);
        }),
      );
  }

  async updateCampaign(data: UpdateCampaignDto, employerId: string) {
    const campaign = await lastValueFrom(this.findCampaignById(data.id));

    let check: boolean = false;

    if (campaign.employerId === employerId) {
      check = true;
    }
    if (check) {
      return this.companyClient.send({ cmd: 'update_campaign' }, data).pipe(
        catchError((error) => {
          return throwError(() => error.response);
        }),
      );
    } else {
      throw new BadRequestException('Employer do not create this campaign');
    }
  }

  findCampaignByEmployerId(employerId: string, page: number, limit: number) {
    return this.companyClient.send<{ data: FindCampaignDTOResponse[] }>(
      { cmd: 'find_campaign_by_employerId' },
      { employerId, page, limit },
    );
  }

  async findAllCampaignByEmployerId(employerId: string) {
    const result = this.companyClient.send(
      { cmd: 'find_all_campaign_by_employerid' },
      employerId,
    );

    const campaign = await lastValueFrom(result);
    if (campaign.data.length === 0) {
      return null;
    } else {
      return campaign;
    }
  }

  deleteCampaign(id: number) {
    return this.companyClient.send({ cmd: 'delete_campaign' }, id).pipe(
      catchError((error) => {
        return throwError(() => error.response);
      }),
    );
  }

  getAllField() {
    return this.companyClient.send({ cmd: 'get_all_field' }, {});
  }

  findFieldById(id: number) {
    return this.companyClient.send({ cmd: 'find_field_by_id' }, id);
  }
}

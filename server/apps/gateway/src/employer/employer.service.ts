import { Inject, Injectable } from '@nestjs/common';
import { Observable, from, switchMap } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEmployerDto } from './dto/Req/createEmployer.dto';
import { FindEmployerDTOResponse } from './dto/Res/find_employer.dto';
import { UpdateEmployerCompanyDTO } from './dto/Req/updateEmployerCompany.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class EmployerService {
  constructor(
    @Inject('EMPLOYER') private readonly employerClient: ClientProxy,
    private readonly uploadService: UploadService,
  ) {}

  createEmployer(createEmployerDTO: CreateEmployerDto): Observable<string> {
    return this.employerClient.send(
      { cmd: 'create_employer' },
      createEmployerDTO,
    );
  }

  getAllEmployers(page: number, limit: number): Observable<string> {
    return this.employerClient.send(
      { cmd: 'get_all_employers' },
      { page, limit },
    );
  }

  findEmployerById(id: string): Observable<FindEmployerDTOResponse> {
    return this.employerClient.send<FindEmployerDTOResponse>(
      { cmd: 'find_employer_by_id' },
      id,
    );
  }

  updateEmployerCompanyId(
    updateEmployerCompanyDTO: UpdateEmployerCompanyDTO,
  ): Observable<string> {
    return this.employerClient.send(
      { cmd: 'update_employer_companyid' },
      updateEmployerCompanyDTO,
    );
  }

  updateEmployerLicense(file: any, employerId: string): Observable<any> {
    const uploadLink$ = from(this.uploadService.upload(file));

    return uploadLink$.pipe(
      switchMap((license: string) =>
        this.employerClient.send(
          { cmd: 'update_employer_license' },
          { employerId, license },
        ),
      ),
    );
  }

  updateEmployerLicenseStatus(
    employerId: string,
    licenseStatus: boolean,
  ): Observable<string> {
    return this.employerClient.send(
      { cmd: 'update_employer_license_status' },
      { employerId, licenseStatus },
    );
  }

  updateEmployerPhoneStatus(
    employerId: string,
    phoneNumberStatus: boolean,
  ): Observable<string> {
    return this.employerClient.send(
      { cmd: 'update_employer_phone_status' },
      { employerId, phoneNumberStatus },
    );
  }

  getAllPositions(): Observable<string> {
    return this.employerClient.send({ cmd: 'get_all_positions' }, {});
  }

  findPositionById(id: number): Observable<string> {
    return this.employerClient.send({ cmd: 'find_position_by_id' }, id);
  }
}

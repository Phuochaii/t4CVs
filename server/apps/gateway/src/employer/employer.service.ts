import { Inject, Injectable } from '@nestjs/common';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEmployerDto } from './dto/Req/createEmployer.dto';
import { FindEmployerDTOResponse } from './dto/Res/find_employer.dto';
import { UpdateEmployerCompanyDTO } from './dto/Req/updateEmployerCompany.dto';
import { UploadService } from '../upload/upload.service';
import { UpdateEmployerDTO } from './dto/Req/updateEmployer.dto';

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
    return this.employerClient
      .send<FindEmployerDTOResponse>({ cmd: 'find_employer_by_id' }, id)
      .pipe(
        catchError((error) => {
          return throwError(() => error.response);
        }),
      );
  }

  getEmployerByCompanyId(companyId: number) {
    return this.employerClient.send(
      { cmd: 'get_employer_by_companyid' },
      companyId,
    );
  }

  updateEmployerCompanyId(
    updateEmployerCompanyDTO: UpdateEmployerCompanyDTO,
  ): Observable<string> {
    return this.employerClient
      .send({ cmd: 'update_employer_companyid' }, updateEmployerCompanyDTO)
      .pipe(
        catchError((error) => {
          return throwError(() => error.response);
        }),
      );
  }

  updateEmployerLicense(file: any, employerId: string): Observable<any> {
    const uploadLink$ = from(this.uploadService.upload(file));

    return uploadLink$.pipe(
      switchMap((license: string) =>
        this.employerClient
          .send({ cmd: 'update_employer_license' }, { employerId, license })
          .pipe(
            catchError((error) => {
              return throwError(() => error.response);
            }),
          ),
      ),
    );
  }

  updateEmployerLicenseStatus(
    employerId: string,
    licenseStatus: boolean,
  ): Observable<string> {
    return this.employerClient
      .send(
        { cmd: 'update_employer_license_status' },
        { employerId, licenseStatus },
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error.response);
        }),
      );
  }

  updateEmployerPhoneStatus(
    employerId: string,
    phoneNumberStatus: boolean,
  ): Observable<string> {
    return this.employerClient
      .send(
        { cmd: 'update_employer_phone_status' },
        { employerId, phoneNumberStatus },
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error.response);
        }),
      );
  }

  updateEmployer(file: any, data: UpdateEmployerDTO): Observable<string> {
    if (file) {
      const uploadLink$ = from(this.uploadService.upload(file));

      return uploadLink$.pipe(
        switchMap((img: string) => {
          data.image = img;

          return this.employerClient
            .send({ cmd: 'update_employer' }, data)
            .pipe(
              catchError((error) => {
                return throwError(() => error.response);
              }),
            );
        }),
      );
    } else {
      return this.employerClient.send({ cmd: 'update_employer' }, data).pipe(
        catchError((error) => {
          return throwError(() => error.response);
        }),
      );
    }
  }

  getEmployerByName(name: string, page: number, limit: number) {
    return this.employerClient
      .send({ cmd: 'get_employer_by_name' }, { name, page, limit })
      .pipe(
        catchError((error) => {
          return throwError(() => error.response);
        }),
      );
  }

  getAllPositions(): Observable<string> {
    return this.employerClient.send({ cmd: 'get_all_positions' }, {});
  }

  findPositionById(id: number): Observable<string> {
    return this.employerClient.send({ cmd: 'find_position_by_id' }, id);
  }
}

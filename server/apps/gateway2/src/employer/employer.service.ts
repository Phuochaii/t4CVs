import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEmployerDto } from './dto/Req/createEmployer.dto';
import { FindEmployerDTOResponse } from './dto/Res/find_employer.dto';
import { AuthenticationService } from '../authentication/authentication.service';
import { Role } from '../authentication/dto/role.dto';
import { CreateEmployerAccountDto } from './dto/Req/create-hr.dto';
import { UpdateEmployerCompanyDTO } from './dto/Req/updateEmployerCompany.dto';
import { UploadService } from '../upload/upload.service';
import { UpdateEmployerDTO } from './dto/Req/updateEmployer.dto';

@Injectable()
export class EmployerService {
  constructor(
    @Inject('EMPLOYER') private readonly employerClient: ClientProxy,
    private readonly authenticationService: AuthenticationService,
    private readonly uploadService: UploadService,
  ) {}

  async createEmployer(
    createEmployerDTO: CreateEmployerDto,
  ): Promise<Observable<string>> {
    await this.authenticationService.asignRole({
      userId: createEmployerDTO.id,
      role: Role.HR,
    });
    return this.employerClient.send(
      { cmd: 'create_employer' },
      createEmployerDTO,
    );
  }

  async createEmployerAccount(
    createEmployerAccountDto: CreateEmployerAccountDto,
  ) {
    const auth0Account = await this.authenticationService.createAccount({
      email: createEmployerAccountDto.email,
      password: createEmployerAccountDto.password,
    });
    await this.authenticationService.asignRole({
      userId: auth0Account.data.user_id,
      role: Role.HR,
    });
    return auth0Account;
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

  getEmployerByCompanyId(
    companyId: number,
  ): Observable<FindEmployerDTOResponse[]> {
    return this.employerClient.send(
      { cmd: 'get_employer_by_companyid' },
      companyId,
    );
  }

  updateEmployerCompanyId(updateEmployerCompanyDTO: UpdateEmployerCompanyDTO) {
    return this.employerClient
      .send({ cmd: 'update_employer_companyid' }, updateEmployerCompanyDTO)
      .pipe(
        catchError((error) => {
          return throwError(() => error.response);
        }),
      );
  }

  updateEmployerLicense(files: any[], employerId: string): Observable<any> {
    if (files.length <= 0) {
      throw new BadRequestException('You do not upload any file');
    } else if (files.length === 1) {
      const uploadLink$ = from(this.uploadService.uploadFiles(files));

      return uploadLink$.pipe(
        switchMap((licenses: string[]) => {
          const license = licenses[0];
          const supplement = null;

          return this.employerClient
            .send(
              { cmd: 'update_employer_license' },
              { employerId, license, supplement },
            )
            .pipe(
              catchError((error) => {
                return throwError(() => error.response);
              }),
            );
        }),
      );
    } else if (files.length === 2) {
      const uploadLink$ = from(this.uploadService.uploadFiles(files));

      return uploadLink$.pipe(
        switchMap((licenses: string[]) => {
          const license = licenses[0];
          const supplement = licenses[1];

          return this.employerClient
            .send(
              { cmd: 'update_employer_license' },
              { employerId, license, supplement },
            )
            .pipe(
              catchError((error) => {
                return throwError(() => error.response);
              }),
            );
        }),
      );
    } else {
      throw new BadRequestException('You upload more 2 files');
    }
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

  checkEmployer(id: string): Observable<boolean> {
    return this.employerClient.send({ cmd: 'check_employer' }, id);
  }
}

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'Application';

export interface DeleteApplicationRequest {
  id: number;
}

export interface ReadApplicationRequest {
  id: number;
}

export interface ReadAllApplicationByUserIdRequest {
  page: number;
  limit: number;
  userId: string;
}

export interface ReadAllApplicationByCampaignIdRequest {
  page: number;
  limit: number;
  campaignIds: number[];
  status?: boolean | undefined;
}

export interface CreateApplicationRequest {
  id: number;
  fullname: string;
  phone: string;
  email: string;
  coverLetter: string;
  campaignId: number;
  userId: string;
  cvId: number;
}

export interface UpdateApplicationRequest {
  id: number;
}

export interface Empty {}

export interface Pagination {
  page: number;
  limit: number;
}

/** The JobApplication message represents a job application record. */
export interface Application {
  id: number;
  status: boolean;
  fullname: string;
  phone: string;
  email: string;
  coverLetter: string;
  createdAt: string;
  updateAt: string;
  campaignId: number;
  userId: string;
  cvId: number;
}

export interface Applications {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  applications: Application[];
}

export const APPLICATION_PACKAGE_NAME = 'Application';

/** The job application service definition. */

export interface ApplicationServiceClient {
  createApplication(request: CreateApplicationRequest): Observable<Application>;

  readApplication(request: ReadApplicationRequest): Observable<Application>;

  readAllApplication(request: Pagination): Observable<Applications>;

  readAllApplicationByCampaignId(
    request: ReadAllApplicationByCampaignIdRequest,
  ): Observable<Applications>;

  readAllApplicationByUserId(
    request: ReadAllApplicationByUserIdRequest,
  ): Observable<Applications>;

  updateApplication(request: UpdateApplicationRequest): Observable<Application>;

  deleteApplication(request: DeleteApplicationRequest): Observable<Empty>;
}

/** The job application service definition. */

export interface ApplicationServiceController {
  createApplication(
    request: CreateApplicationRequest,
  ): Promise<Application> | Observable<Application> | Application;

  readApplication(
    request: ReadApplicationRequest,
  ): Promise<Application> | Observable<Application> | Application;

  readAllApplication(
    request: Pagination,
  ): Promise<Applications> | Observable<Applications> | Applications;

  readAllApplicationByCampaignId(
    request: ReadAllApplicationByCampaignIdRequest,
  ): Promise<Applications> | Observable<Applications> | Applications;

  readAllApplicationByUserId(
    request: ReadAllApplicationByUserIdRequest,
  ): Promise<Applications> | Observable<Applications> | Applications;

  updateApplication(
    request: UpdateApplicationRequest,
  ): Promise<Application> | Observable<Application> | Application;

  deleteApplication(
    request: DeleteApplicationRequest,
  ): Promise<Empty> | Observable<Empty> | Empty;
}

export function ApplicationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createApplication',
      'readApplication',
      'readAllApplication',
      'readAllApplicationByCampaignId',
      'readAllApplicationByUserId',
      'updateApplication',
      'deleteApplication',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('ApplicationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('ApplicationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const APPLICATION_SERVICE_NAME = 'ApplicationService';

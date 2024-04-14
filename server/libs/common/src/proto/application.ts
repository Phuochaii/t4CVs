/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "Application";

export interface ReadApplicationRequest {
  id: number;
}

export interface CreateApplicationRequest {
  id: number;
  fullname: string;
  phone: string;
  email: string;
  cvId: number;
}

export interface Empty {
}

/** The JobApplication message represents a job application record. */
export interface Application {
  id: number;
  status: Application_Status;
  fullname: string;
  phone: string;
  email: string;
  coverLetter: string;
  createdAt: string;
  updateAt: string;
  jobId: number;
  userId: number;
  cvId: number;
}

export enum Application_Status {
  SUBMITTED = 0,
  VIEWED = 1,
  UNRECOGNIZED = -1,
}

export const APPLICATION_PACKAGE_NAME = "Application";

/** The job application service definition. */

export interface ApplicationServiceClient {
  createApplication(request: CreateApplicationRequest): Observable<Application>;

  readApplication(request: ReadApplicationRequest): Observable<Application>;
}

/** The job application service definition. */

export interface ApplicationServiceController {
  createApplication(request: CreateApplicationRequest): Promise<Application> | Observable<Application> | Application;
  readApplication(request: ReadApplicationRequest): Promise<Application> | Observable<Application> | Application;
}

export function ApplicationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createApplication", "readApplication"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ApplicationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ApplicationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const APPLICATION_SERVICE_NAME = "ApplicationService";

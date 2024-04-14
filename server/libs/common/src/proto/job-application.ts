/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "jobapplication";

export interface Empty {
}

/** The JobApplication message represents a job application record. */
export interface JobApplication {
  id: number;
  userId: number;
  jobPostId: number;
  cvId: number;
  status: JobApplication_Status;
}

export enum JobApplication_Status {
  SUBMITTED = 0,
  VIEWED = 1,
  UNRECOGNIZED = -1,
}

export interface ReadJobApplicationRequest {
  id: number;
}

export interface DeleteJobApplicationRequest {
  id: number;
}

export interface CreateApplicationRequest {
  linkCV : string;
  fullname: string;
  email: string;
  phone: number;
}

export interface ApplyJobApplicationRequest {
  userId: number;
  jobPostId: number;
  cvId: number;
}

export const JOBAPPLICATION_PACKAGE_NAME = "jobapplication";

/** The job application service definition. */

export interface JobApplicationServiceClient {
  createJobApplication(request: CreateJobApplicationRequest): Observable<JobApplication>;

  readJobApplication(request: ReadJobApplicationRequest): Observable<JobApplication>;

  updateJobApplication(request: JobApplication): Observable<JobApplication>;

  deleteJobApplication(request: DeleteJobApplicationRequest): Observable<Empty>;
}

/** The job application service definition. */

export interface JobApplicationServiceController {
  createJobApplication(
    request: CreateJobApplicationRequest,
  ): Promise<JobApplication> | Observable<JobApplication> | JobApplication;

  readJobApplication(
    request: ReadJobApplicationRequest,
  ): Promise<JobApplication> | Observable<JobApplication> | JobApplication;

  updateJobApplication(request: JobApplication): Promise<JobApplication> | Observable<JobApplication> | JobApplication;

  deleteJobApplication(request: DeleteJobApplicationRequest): Promise<Empty> | Observable<Empty> | Empty;
}

export function JobApplicationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createJobApplication",
      "readJobApplication",
      "updateJobApplication",
      "deleteJobApplication",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("JobApplicationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("JobApplicationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const JOB_APPLICATION_SERVICE_NAME = "JobApplicationService";

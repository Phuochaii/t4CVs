import { Controller, Get } from '@nestjs/common';
import { JobApplicationService } from './job-application-service.service';
import { CreateJobApplicationRequest, DeleteJobApplicationRequest, Empty, JobApplication, JobApplicationServiceController, JobApplicationServiceControllerMethods, ReadJobApplicationRequest } from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@JobApplicationServiceControllerMethods()
export class JobApplicationController implements JobApplicationServiceController {
  constructor(private readonly jobApplicationServiceService: JobApplicationService) { }
  createJobApplication(request: CreateJobApplicationRequest): JobApplication | Promise<JobApplication> | Observable<JobApplication> {
    throw new Error('Method not implemented.');
  }
  readJobApplication(request: ReadJobApplicationRequest): JobApplication | Promise<JobApplication> | Observable<JobApplication> {
    throw new Error('Method not implemented.');
  }
  updateJobApplication(request: JobApplication): JobApplication | Promise<JobApplication> | Observable<JobApplication> {
    throw new Error('Method not implemented.');
  }
  deleteJobApplication(request: DeleteJobApplicationRequest): Empty | Promise<Empty> | Observable<Empty> {
    throw new Error('Method not implemented.');
  }
}

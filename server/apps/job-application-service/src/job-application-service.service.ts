import { CreateJobApplicationRequest, JobApplication } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JobApplicationService {
  private jobApplications: JobApplication[] = [];

  create(createRequest: CreateJobApplicationRequest): JobApplication {
    const newJobApplication: JobApplication = {
      id: this.jobApplications.length,
      userId: createRequest.userId,
      jobPostId: createRequest.jobPostId,
      cvId: createRequest.cvId,
      status: 0,
    };

    this.jobApplications.push(newJobApplication);
    console.log('jobApplications:', this.jobApplications);
    return newJobApplication;
  }
}

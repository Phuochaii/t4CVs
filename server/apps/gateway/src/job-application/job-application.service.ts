import { CreateJobApplicationRequest, JOBAPPLICATION_PACKAGE_NAME, JOB_APPLICATION_SERVICE_NAME, JobApplication, JobApplicationServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class JobApplicationService implements OnModuleInit {
  private jobApplicationServiceClient: JobApplicationServiceClient;

  @Inject(JOBAPPLICATION_PACKAGE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.jobApplicationServiceClient = this.client.getService<JobApplicationServiceClient>(JOB_APPLICATION_SERVICE_NAME);
  }
  create(createJobApplicationDto: CreateJobApplicationRequest) {
    return this.jobApplicationServiceClient.createJobApplication(createJobApplicationDto);
  }

  findAll() {
    return `This action returns all jobApplication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobApplication`;
  }

  update(id: number, updateJobApplicationDto: JobApplication) {
    return `This action updates a #${id} jobApplication`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobApplication`;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateJobDto } from './job/Type/Req/createJob.dto';
@Injectable()
export class GatewayService {
  constructor(@Inject('JOB') private readonly jobClient: ClientProxy) {}
  getHello(): string {
    return 'Hello World!';
  }

  getAllJobs(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_jobs' }, {});
    // return jobs.pipe((response) => {
    //   return response;
    // });
  }

  createJob(createJobDTO: CreateJobDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_job' }, createJobDTO);
  }

  // getHelloFromCVService(): Observable<string> {
  //   const a = this.cvClient.send({ cmd: 'create_cv' }, {});
  //   return a.pipe((response) => {
  //     return response;
  //   });
  // }
}

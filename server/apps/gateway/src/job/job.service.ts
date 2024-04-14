import { Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/Req/createJob.dto';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMajorDto } from './dto/Req/createMajor.dto';

@Injectable()
export class JobService {
  constructor(@Inject('JOB') private readonly jobClient: ClientProxy) {}
  getAllJobs(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_jobs' }, {});
    // return jobs.pipe((response) => {
    //   return response;
    // });
  }
  getValidJobs(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_valid_jobs' }, {});
  }

  createJob(createJobDTO: CreateJobDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_job' }, createJobDTO);
  }

  findJobById(id: number): Observable<string> {
    return this.jobClient.send({ cmd: 'find_job_by_id' }, id);
  }

  createMajor(major: CreateMajorDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_major' }, major);
  }

  getAllMajor(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_major' }, {});
  }
}

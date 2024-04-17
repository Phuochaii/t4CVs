import { Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/Req/createJob.dto';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBaseDto, CreateMajorDto } from './dto/Req/createBase.dto';
import { QueryDTO } from './dto/Req/query.dto';

@Injectable()
export class JobService {
  constructor(@Inject('JOB') private readonly jobClient: ClientProxy) {}
  getAllJobs(query: QueryDTO): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_jobs' }, query);
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

  createMajor(major: CreateBaseDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_major' }, major);
  }

  getAllMajor(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_major' }, {});
  }
  createField(major: CreateBaseDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_field' }, major);
  }

  getAllField(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_field' }, {});
  }
  createCurrency(major: CreateBaseDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_currency' }, major);
  }

  getAllCurrency(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_currency' }, {});
  }
  createLevel(major: CreateBaseDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_level' }, major);
  }

  getAllLevel(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_level' }, {});
  }
}

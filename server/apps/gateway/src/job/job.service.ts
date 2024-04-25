import { Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/Req/createJob.dto';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBaseDto } from './dto/Req/createBase.dto';
import { UpdateJobDto } from './dto/Req/update-job.dto';

@Injectable()
export class JobService {
  constructor(@Inject('JOB') private readonly jobClient: ClientProxy) {}
  getAllJobs(query: any): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_jobs' }, query);
  }
  getValidJobs(query: any): Observable<string> {
    return this.jobClient.send({ cmd: 'get_valid_jobs' }, query);
  }

  createJob(createJobDTO: CreateJobDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_job' }, createJobDTO);
  }

  findJobById(id: number): Observable<string> {
    return this.jobClient.send({ cmd: 'find_job_by_id' }, id);
  }

  updateJobStatus(data: UpdateJobDto): Observable<string> {
    return this.jobClient.send({ cmd: 'update_job_status' }, data);
  }

  createJobInfo(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_job_info' }, {});
  }

  createMajor(majors: CreateBaseDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_major' }, majors);
  }

  getAllMajor(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_major' }, {});
  }
  createField(fields: CreateBaseDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_field' }, fields);
  }

  getAllField(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_field' }, {});
  }
  createCurrency(currencies: CreateBaseDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_currency' }, currencies);
  }

  getAllCurrency(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_currency' }, {});
  }
  createLevel(levels: CreateBaseDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_level' }, levels);
  }

  getAllLevel(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_level' }, {});
  }
  createLocation(locations: CreateBaseDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_location' }, locations);
  }

  getAllLocation(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_location' }, {});
  }
  createExp(exps: CreateBaseDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_exp' }, exps);
  }

  getAllExp(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_exp' }, {});
  }
  createJobType(types: CreateBaseDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_type' }, types);
  }

  getAllJobType(): Observable<string> {
    return this.jobClient.send({ cmd: 'get_all_type' }, {});
  }
}

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/Req/createJob.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBaseDto } from './dto/Req/createBase.dto';
import { UpdateJobDto } from './dto/Req/update-job.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class JobService {
  constructor(
    @Inject('JOB') private readonly jobClient: ClientProxy,
    private readonly companyService: CompanyService,
  ) {}

  async getAllJobs(query: any) {
    const res = this.jobClient.send({ cmd: 'get_all_jobs' }, query);
    const lastRes = await lastValueFrom(res);
    const jobs = lastRes.data.map(async (job) => {
      const company = this.companyService.findCompanyById(job.companyId);
      const lastCompany = await lastValueFrom(company);
      delete job.companyId;
      const result = { ...job, company: lastCompany };
      return result;
    });
    lastRes.data = await Promise.all(jobs);
    return lastRes;
  }
  async getValidJobs(query: any) {
    const res = this.jobClient.send({ cmd: 'get_valid_jobs' }, query);
    const lastRes = await lastValueFrom(res);
    const jobs = lastRes.data.map(async (job) => {
      const company = this.companyService.findCompanyById(job.companyId);
      const lastCompany = await lastValueFrom(company);
      delete job.companyId;
      const result = { ...job, company: lastCompany };
      return result;
    });
    lastRes.data = await Promise.all(jobs);
    return lastRes;
  }

  createJob(createJobDTO: CreateJobDto): Observable<string> {
    return this.jobClient.send({ cmd: 'create_job' }, createJobDTO);
  }

  async findJobById(id: number) {
    // return this.jobClient.send({ cmd: 'find_job_by_id' }, id);
    const job = this.jobClient.send({ cmd: 'find_job_by_id' }, id);
    const lastJob = await lastValueFrom(job);
    if (lastJob === null) {
      throw new BadRequestException(`Job doesn't exit!`);
    }
    const company = this.companyService.findCompanyById(lastJob.companyId);
    const lastCompany = await lastValueFrom(company);
    delete lastJob.companyId;
    const result = { ...lastJob, company: lastCompany };
    return result;
  }

  async findJobByCampaignId(campaignId: number) {
    const job = this.jobClient.send(
      { cmd: 'find_job_by_campaignId' },
      campaignId,
    );
    const lastJob = await lastValueFrom(job);
    if (lastJob === null) {
      throw new BadRequestException(`Job doesn't exit!`);
    }
    const company = this.companyService.findCompanyById(lastJob.companyId);
    const lastCompany = await lastValueFrom(company);
    delete lastJob.companyId;
    const result = { ...lastJob, company: lastCompany };
    return result;
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

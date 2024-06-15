import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateJobDto } from './dto/Req/createJob.dto';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBaseDto } from './dto/Req/createBase.dto';
import { UpdateStatusJobDto } from './dto/Req/update-status-job.dto';
import { CompanyService } from '../company/company.service';
import { UpdateJobDTO } from './dto/Req/update-job.dto';

@Injectable()
export class JobService {
  constructor(
    @Inject('JOB') private readonly jobClient: ClientProxy,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
  ) {}

  deleteJobByCampaignId(campaignId: number) {
    return this.jobClient
      .send({ cmd: 'delete_job_by_campaignId' }, campaignId)
      .pipe(
        catchError((error) => {
          return throwError(() => error.response);
        }),
      );
  }

  deleteJob(id: number) {
    return this.jobClient.send({ cmd: 'delete_job' }, id).pipe(
      catchError((error) => {
        return throwError(() => error.response);
      }),
    );
  }

  updateJob(data: UpdateJobDTO) {
    return this.jobClient.send({ cmd: 'update_job' }, data).pipe(
      catchError((error) => {
        return throwError(() => error.response);
      }),
    );
  }
  async findJobsByCampaignIds(campaignIds: number[]) {
    const jobs = await lastValueFrom(
      this.jobClient.send({ cmd: 'find_jobs_by_campaignIds' }, campaignIds),
    );
    if (jobs === null) {
      throw new BadRequestException(`Jobs doesn't exit!`);
    }
    const companiesId = jobs.map((job) => job.companyId);
    const companies = await lastValueFrom(
      this.companyService.findCompanyByArrayId(companiesId),
    );
    const jobsFinal = jobs.map((job) => {
      const company =
        companies.find(
          (company) => company !== null && company.id === job.companyId,
        ) ?? null;
      delete job.companyId;
      return { ...job, company };
    });
    return jobsFinal;
  }

  async getAllJobs(query: any) {
    const res = this.jobClient.send({ cmd: 'get_all_jobs' }, query);
    const lastRes = await lastValueFrom(res);
    const jobs = lastRes.data;
    const companiesId = jobs.map((job) => job.companyId);
    const companies = this.companyService.findCompanyByArrayId(companiesId);
    const lastCompanies = await lastValueFrom(companies);
    const jobsFinal = lastRes.data.map((job) => {
      const company =
        lastCompanies.find(
          (company) => company !== null && company.id === job.companyId,
        ) ?? null;
      delete job.companyId;
      return { ...job, company };
    });
    lastRes.data = jobsFinal;
    return lastRes;
  }
  async getValidJobs(query: any) {
    const res = this.jobClient.send({ cmd: 'get_valid_jobs' }, query);
    const lastRes = await lastValueFrom(res);
    const jobs = lastRes.data;
    const companiesId = jobs.map((job) => job.companyId);
    const companies = this.companyService.findCompanyByArrayId(companiesId);
    const lastCompanies = await lastValueFrom(companies);
    const jobsFinal = lastRes.data.map((job) => {
      const company =
        lastCompanies.find(
          (company) => company !== null && company.id === job.companyId,
        ) ?? null;
      delete job.companyId;
      return { ...job, company };
    });
    lastRes.data = jobsFinal;
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
      throw new BadRequestException(
        `Doesn't exit job with campaign ID = ${campaignId}!`,
      );
    }
    const company = this.companyService.findCompanyById(lastJob.companyId);
    const lastCompany = await lastValueFrom(company);
    delete lastJob.companyId;
    const result = { ...lastJob, company: lastCompany };
    return result;
  }

  updateJobStatus(data: UpdateStatusJobDto) {
    const status = this.jobClient.send({ cmd: 'update_job_status' }, data);
    const lastStatus = lastValueFrom(status);
    if (lastStatus) {
      return 'Updated successfully!';
    }
    return new BadRequestException(`Update failed!`);
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

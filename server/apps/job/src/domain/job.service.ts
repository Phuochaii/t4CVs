import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/Req/create-job.dto';
import { MoreThanOrEqual, LessThanOrEqual, ILike } from 'typeorm';
import { JobDetailService } from './services/job-detail.service';
import { MajorService } from './services/major.service';
import { LevelService } from './services/level.service';
import { CurrencyService } from './services/currency.service';
import { FieldService } from './services/field.service';
import { CreateBaseDto } from './dto/Req/createBase.dto';
import { LocationService } from './services/location.service';
import { ExperienceService } from './services/experience.service';
import { TypeService } from './services/type.service';
import { FindJobRespDTO } from './dto/Resp/findJobResp.dto';
import { QueryDTO } from './dto/Req/query.dto';
import { JobAggregate } from './aggregate/job.aggregate';
import { JobRepository } from './repository';
import { FindJobByCampaignIdDto } from './dto/Resp/find-job-by-campaignId.dto';
import { UpdateJobStatusDto } from './dto/Req/update-job-status.dto';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class JobService {
  constructor(
    private jobRepository: JobRepository,
    private jobDetailService: JobDetailService,
    private majorService: MajorService,
    private levelService: LevelService,
    private currencyService: CurrencyService,
    private fieldService: FieldService,
    private locationService: LocationService,
    private experienceService: ExperienceService,
    private typeService: TypeService,
  ) {}

  async deleteJobByCampaignId(campaignId: number) {
    const job = await this.jobRepository.findJobByCampaignId(campaignId);
    if (!job)
      throw new RpcException(
        new BadRequestException(
          `Job doesn't exist with campaign id = ${campaignId}!`,
        ),
      );
    await this.jobDetailService.deleteJobDetail(job.jobDetail.id);
    return await this.jobRepository.deleteJob(job.id);
  }

  async deleteJob(id: number) {
    const job = await this.jobRepository.findJobById(id);
    if (!job)
      throw new RpcException(new BadRequestException(`Job doesn't exist!`));
    await this.jobDetailService.deleteJobDetail(job.jobDetail.id);
    return await this.jobRepository.deleteJob(id);
  }
  async updateJob(data: JobAggregate) {
    await this.jobDetailService.updateJobDetail(data.jobDetail);
    return await this.jobRepository.saveJob(data);
  }

  async findJobByCampaignId(
    campaignId: number,
  ): Promise<FindJobByCampaignIdDto> {
    const job = await this.jobRepository.findJobByCampaignId(campaignId);
    return job;
  }

  async findJobsByCampaignIds(
    campaignIds: number[],
  ): Promise<FindJobByCampaignIdDto[]> {
    const jobs = await this.jobRepository.findJobsByCampaignIds(campaignIds);
    return jobs;
  }

  async create(createJobDto: CreateJobDto) {
    const job = await this.jobRepository.createJob(createJobDto);
    const jobDetail = await this.jobDetailService.createJobDetail(createJobDto);
    job.jobDetail = jobDetail;
    const major = await this.majorService.findById(createJobDto.majorId);
    job.major = major;
    //get level
    const level = await this.levelService.findById(createJobDto.levelId);
    job.level = level;
    //get currency
    const currency = await this.currencyService.findById(
      createJobDto.currencyId,
    );
    job.currency = currency;
    //get exp
    const exp = await this.experienceService.findById(createJobDto.expId);
    job.exp = exp;
    //get type
    const type = await this.typeService.findById(createJobDto.typeId);
    job.type = type;
    //get list of fields
    job.fields = [];
    createJobDto.fieldsId.map(async (fieldId) => {
      const field = await this.fieldService.findById(fieldId);
      job.fields.push(field);
    });

    //get list of locations
    job.locations = [];
    createJobDto.locationsId.map(async (locationId) => {
      const location = await this.locationService.findById(locationId);
      job.locations.push(location);
    });
    return await this.jobRepository.saveJob(job);
  }

  async findAll(query: QueryDTO): Promise<FindJobRespDTO> {
    const {
      locationId = null,
      fieldId = null,
      page = 1,
      limit = 10,
      // salaryMin = 0,
      // salaryMax = 1000000000,
      ...newQuery
    } = query;
    const skip = (page - 1) * limit;
    if (newQuery.titleRecruitment) {
      newQuery.titleRecruitment = ILike(`%${newQuery.titleRecruitment}%`);
    }
    newQuery.salaryMax = LessThanOrEqual(newQuery.salaryMax ?? 1000000000);
    newQuery.salaryMin = MoreThanOrEqual(newQuery.salaryMin ?? 0);
    newQuery.expiredDate = MoreThanOrEqual(new Date());
    let jobs = await this.jobRepository.searchJob(newQuery);

    // get the list of job have fieldId
    if (fieldId) {
      const jobField = jobs.filter((job) => {
        return job.fields.some((field) => field.id == fieldId);
      });
      jobs = jobField;
    }

    // get the list of job have locationId
    if (locationId) {
      const jobLocation = jobs.filter((job) => {
        return job.locations.some((location) => location.id == locationId);
      });
      jobs = jobLocation;
    }
    const result: FindJobRespDTO = {
      page: parseInt(String(page)),
      limit: parseInt(String(limit)),
      total: jobs.length,
      total_pages: Math.ceil(jobs.length / limit),
      data: jobs.slice(skip, skip + parseInt(String(limit))),
    };
    return result;
  }

  async findValidJobs(query: QueryDTO): Promise<FindJobRespDTO> {
    const {
      locationId = null,
      fieldId = null,
      page = 1,
      limit = 10,
      // salaryMin = 0,
      // salaryMax = 1000000000,
      ...newQuery
    } = query;
    newQuery.status = true;
    const skip = (page - 1) * limit;
    if (newQuery.titleRecruitment) {
      newQuery.titleRecruitment = ILike(`%${newQuery.titleRecruitment}%`);
    }
    newQuery.salaryMax = LessThanOrEqual(newQuery.salaryMax ?? 1000000000);
    newQuery.salaryMin = MoreThanOrEqual(newQuery.salaryMin ?? 0);
    newQuery.expiredDate = MoreThanOrEqual(new Date());
    let jobs = await this.jobRepository.searchJob(newQuery);

    // get the list of job have fieldId
    if (fieldId) {
      const jobField = jobs.filter((job) => {
        return job.fields.some((field) => field.id == fieldId);
      });
      jobs = jobField;
    }

    // get the list of job have locationId
    if (locationId) {
      const jobLocation = jobs.filter((job) => {
        return job.locations.some((location) => location.id == locationId);
      });
      jobs = jobLocation;
    }

    const result: FindJobRespDTO = {
      page: parseInt(String(page)),
      limit: parseInt(String(limit)),
      total: jobs.length,
      total_pages: Math.ceil(jobs.length / limit),
      data: jobs.slice(skip, skip + parseInt(String(limit))),
    };
    return result;
  }

  async createJobInfo() {
    const major = await this.findAllMajor();
    const level = await this.findAllLevel();
    const currency = await this.findAllCurrency();
    const field = await this.findAllField();
    const location = await this.findAllLocation();
    const exp = await this.findAllExp();
    const type = await this.findAllType();
    return {
      major,
      level,
      currency,
      field,
      location,
      exp,
      type,
    };
  }

  async findJobById(id: number): Promise<JobAggregate> {
    return await this.jobRepository.findJobById(id);
  }

  async updateJobStatus(data: UpdateJobStatusDto) {
    return await this.jobRepository.updateJobStatus(data);
  }

  async createMajor(majors: CreateBaseDto) {
    return await this.majorService.create(majors);
  }
  async findAllMajor() {
    return await this.majorService.findAll();
  }
  async createLevel(levels: CreateBaseDto) {
    return await this.levelService.create(levels);
  }
  async findAllLevel() {
    return await this.levelService.findAll();
  }
  async createCurrency(currencies: CreateBaseDto) {
    return await this.currencyService.create(currencies);
  }
  async findAllCurrency() {
    return await this.currencyService.findAll();
  }
  async createField(fields: CreateBaseDto) {
    return await this.fieldService.create(fields);
  }
  async findAllField() {
    return await this.fieldService.findAll();
  }
  async createLocation(fields: CreateBaseDto) {
    return await this.locationService.create(fields);
  }
  async findAllLocation() {
    return await this.locationService.findAll();
  }
  async createExp(exps: CreateBaseDto) {
    return await this.experienceService.create(exps);
  }
  async findAllExp() {
    return await this.experienceService.findAll();
  }
  async createType(types: CreateBaseDto) {
    return await this.typeService.create(types);
  }
  async findAllType() {
    return await this.typeService.findAll();
  }
}

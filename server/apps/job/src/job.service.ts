import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/Req/create-job.dto';
import { Job } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  MoreThanOrEqual,
  LessThanOrEqual,
  MoreThan,
  Like,
  ILike,
} from 'typeorm';
import { JobDetailService } from './job-detail/job-detail.service';
import { MajorService } from './major/major.service';
import { LevelService } from './level/level.service';
import { CurrencyService } from './currency/currency.service';
import { FieldService } from './field/field.service';
import { UpdateJobDto } from './dto/Req/update-job.dto';
import { CreateBaseDto } from './dto/Req/createBase.dto';
import { LocationService } from './location/location.service';
import { ExperienceService } from './experience/experience.service';
import { TypeService } from './type/type.service';
import { FindJobRespDTO } from './dto/Resp/findJobResp.dto';
@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private jobDetailService: JobDetailService,
    private majorService: MajorService,
    private levelService: LevelService,
    private currencyService: CurrencyService,
    private fieldService: FieldService,
    private locationService: LocationService,
    private experienceService: ExperienceService,
    private typeService: TypeService,
  ) {}

  async findJobByCampaignId(campaignId: number) {
    const result = await this.jobRepository.findOne({
      where: {
        status: true,
        campaignId,
      },
      relations: [
        'jobDetail',
        'major',
        'level',
        'currency',
        'fields',
        'exp',
        'type',
        'locations',
      ],
    });
    //await result.jobDetail;
    return result;
  }

  async create(createJobDto: CreateJobDto) {
    const job = await this.jobRepository.save(createJobDto);
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
    return await this.jobRepository.save(job);
  }

  async findAll(query: any): Promise<FindJobRespDTO> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const min = query.salaryMin ?? 0;
    const max = query.salaryMax ?? 1000000000;
    const skip = (page - 1) * limit;
    const fieldId = query.fieldId ?? null;
    const locationId = query.locationId ?? null;
    const titleRecruitment = query.titleRecruitment ?? null;
    delete query.locationId;
    delete query.fieldId;
    delete query.page;
    delete query.limit;
    delete query.salaryMin;
    delete query.salaryMax;
    if (titleRecruitment) {
      query.titleRecruitment = ILike(`%${titleRecruitment}%`);
    }
    let jobs = await this.jobRepository.find({
      where: {
        ...query,
        salaryMin: MoreThanOrEqual(min),
        salaryMax: LessThanOrEqual(max),
        expiredDate: MoreThan(new Date()),
      },
      // skip,
      // take: limit,
      order: {
        updateAt: 'ASC',
      },
      relations: [
        'major',
        'level',
        'currency',
        'fields',
        'exp',
        'type',
        'locations',
      ],
    });

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
      page,
      limit,
      total: jobs.length,
      total_pages: Math.ceil(jobs.length / limit),
      data: jobs.slice(skip, skip + limit),
    };
    return result;
  }

  async findValidJobs(query: any): Promise<FindJobRespDTO> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    query.status = true;
    const min = query.salaryMin ?? 0;
    const max = query.salaryMax ?? 1000000000;
    const skip = (page - 1) * limit;
    const fieldId = query.fieldId ?? null;
    const locationId = query.locationId ?? null;
    const titleRecruitment = query.titleRecruitment ?? null;
    delete query.locationId;
    delete query.fieldId;
    delete query.page;
    delete query.limit;
    delete query.salaryMin;
    delete query.salaryMax;
    if (titleRecruitment) {
      query.titleRecruitment = ILike(`%${titleRecruitment}%`);
    }
    let jobs = await this.jobRepository.find({
      where: {
        ...query,
        salaryMin: MoreThanOrEqual(min),
        salaryMax: LessThanOrEqual(max),
        expiredDate: MoreThan(new Date()),
      },
      // skip,
      // take: limit,
      order: {
        updateAt: 'ASC',
      },
      relations: [
        'major',
        'level',
        'currency',
        'fields',
        'exp',
        'type',
        'locations',
      ],
    });
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
      page,
      limit,
      total: jobs.length,
      total_pages: Math.ceil(jobs.length / limit),
      data: jobs.slice(skip, skip + limit),
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

  async findJobById(id: number) {
    const result = await this.jobRepository.findOne({
      where: {
        status: true,
        id,
      },
      relations: [
        'jobDetail',
        'major',
        'level',
        'currency',
        'fields',
        'exp',
        'type',
        'locations',
      ],
    });
    //await result.jobDetail;
    return result;
  }

  async updateJobStatus(data: UpdateJobDto) {
    return await this.jobRepository.update(data.id, { status: data.status });
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

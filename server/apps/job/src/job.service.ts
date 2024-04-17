import { Major } from './entities/major.entity';
import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/Req/create-job.dto';
import { Job } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, ArrayContainedBy, Repository, ArrayContains } from 'typeorm';
import { JobDetailService } from './job-detail/job-detail.service';
import { MajorService } from './major/major.service';
import { LevelService } from './level/level.service';
import { CurrencyService } from './currency/currency.service';
import { FieldService } from './field/field.service';
import { UpdateJobDto } from './dto/Req/update-job.dto';
import { QueryDTO } from './dto/Req/query.dto';
import { CreateBaseDto } from './dto/Req/createBase.dto';
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
  ) {}

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
    //get list of fields
    createJobDto.fieldsId.map(async (fieldId) => {
      const field = await this.fieldService.findById(fieldId);
      job.fields.push(field);
    });

    return await this.jobRepository.save(job);
    //TODO: get try 1 save call to save 2 db , hint is using caches
  }

  async findAll(query: QueryDTO): Promise<Job[]> {
    const jobs = await this.jobRepository.find({
      // where: {
      //   region: ArrayContains([query.region]),
      //   exp: query.exp,
      // },
    });
    // const result: FindJobDTOResponse[] = jobs.map((job) => {
    //   const rs: FindJobDTOResponse = {
    //     id: job.id,
    //     titleRecruitment: job.titleRecruitment,
    //     major: job.major,
    //     compaignId: job.compaignId,
    //     salaryMin: job.salaryMin,
    //     salaryMax: job.salaryMax,
    //     exp: job.exp,
    //     region: job.region,
    //     expriedDate: job.expriedDate,
    //     createAt: job.createAt,
    //     updateAt: job.updateAt,
    //   };
    //   return rs;
    // });
    return jobs;
  }

  async findValidJobs(): Promise<Job[]> {
    const jobs = await this.jobRepository.find({
      select: {
        id: true,
        titleRecruitment: true,
        compaignId: true,
        salaryMin: true,
        salaryMax: true,
        exp: true,
        region: true,
        expriedDate: true,
        createAt: true,
        updateAt: true,
      },
      where: {
        status: true,
        // region: Any(['USA']),
      },
      order: {
        updateAt: 'ASC',
      },
      relations: ['major'],
    });
    return jobs;
  }

  async findJobById(id: number) {
    const result = await this.jobRepository.findOne({
      where: {
        status: true,
        id,
      },
      relations: ['jobDetail'],
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
}

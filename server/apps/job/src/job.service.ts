import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/Req/create-job.dto';
import { Job } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindJobDTOResponse } from './dto/Resp/find-job.dto';
import { JobDetailService } from './job-detail/job-detail.service';
import { UpdateJobDto } from './dto/Req/update-job.dto';
@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private JobRepository: Repository<Job>,
    private JobDetailService: JobDetailService,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const jobDetail = await this.JobDetailService.createJobDetail(createJobDto);
    const job = await this.JobRepository.save(createJobDto);
    job.jobDetail = jobDetail;
    return await this.JobRepository.save(job);
    //TODO: get try 1 save call to save 2 db , hint is using caches
  }

  async findAll(): Promise<FindJobDTOResponse[]> {
    const jobs = await this.JobRepository.find();
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

  async findValidJobs(): Promise<FindJobDTOResponse[]> {
    const jobs = await this.JobRepository.find({
      where: {
        status: true,
      },
    });
    const result: FindJobDTOResponse[] = jobs.map((job) => {
      const rs: FindJobDTOResponse = {
        id: job.id,
        titleRecruitment: job.titleRecruitment,
        major: job.major,
        compaignId: job.compaignId,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        exp: job.exp,
        region: job.region,
        expriedDate: job.expriedDate,
        createAt: job.createAt,
        updateAt: job.updateAt,
      };
      return rs;
    });
    return result;
  }

  async findJobById(id: number) {
    const result = await this.JobRepository.findOne({
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
    return await this.JobRepository.update(data.id, { status: data.status });
  }
  // update(id: number, updateJobDto: UpdateJobDto) {
  //   return `This action updates a #${id} job`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} job`;
  // }
}

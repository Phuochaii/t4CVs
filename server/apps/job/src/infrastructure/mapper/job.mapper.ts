import { JobAggregate } from '../../domain/aggregate';
import { Job } from '../schemas/job.schema';
import { Mapper } from './base.mapper';

export class JobMapper implements Mapper<JobAggregate, Job> {
  toDomain(schema: Job): JobAggregate {
    return {
      id: schema.id,
      titleRecruitment: schema.titleRecruitment,
      companyId: schema.companyId,
      campaignId: schema.campaignId,
      salaryMin: schema.salaryMin,
      salaryMax: schema.salaryMax,
      expiredDate: schema.expiredDate,
      createAt: schema.createAt,
      updateAt: schema.updateAt,
      status: schema.status,
      exp: schema.exp,
      level: schema.level,
      currency: schema.currency,
      locations: schema.locations,
      fields: schema.fields,
      type: schema.type,
      major: schema.major,
      jobDetail: schema.jobDetail,
      levelId: schema.levelId,
      majorId: schema.majorId,
      typeId: schema.typeId,
      currencyId: schema.currencyId,
      expId: schema.expId,
    };
  }

  toSchema(domain: JobAggregate): Job {
    return {
      id: domain.id,
      titleRecruitment: domain.titleRecruitment,
      majorId: domain.majorId,
      major: domain.major,
      campaignId: domain.campaignId,
      typeId: domain.typeId,
      type: domain.type,
      currencyId: domain.currencyId,
      currency: domain.currency,
      salaryMin: domain.salaryMin,
      salaryMax: domain.salaryMax,
      expId: domain.expId,
      exp: domain.exp,
      expiredDate: domain.expiredDate,
      createAt: domain.createAt,
      updateAt: domain.updateAt,
      levelId: domain.levelId,
      level: domain.level,
      status: domain.status,
      companyId: domain.companyId,
      locations: domain.locations,
      fields: domain.fields,
      jobDetail: domain.jobDetail,
    };
  }
}

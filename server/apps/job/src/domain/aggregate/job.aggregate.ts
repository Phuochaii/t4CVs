import {
  Currency,
  Experience,
  Field,
  JobDetail,
  Level,
  Location,
  Major,
  Type,
} from '../entities';

export class JobAggregate {
  id: number;
  titleRecruitment: string;
  majorId: number;
  major: Major;
  campaignId: number;
  typeId: number;
  type: Type;
  currencyId: number;
  currency: Currency;
  salaryMin: number;
  salaryMax: number;
  expId: number;
  exp: Experience;
  expiredDate: Date;
  createAt: Date;
  updateAt: Date;
  levelId: number;
  level: Level;
  status: boolean;
  companyId: number;
  locations: Location[];
  fields: Field[];
  jobDetail: JobDetail;
}

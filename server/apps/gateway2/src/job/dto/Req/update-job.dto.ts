import { Field, JobDetail, Location } from '../Type';

export class UpdateJobDTO {
  id: number;
  titleRecruitment: string;
  majorId: number;
  campaignId: number;
  typeId: number;
  currencyId: number;
  salaryMin: number;
  salaryMax: number;
  expId: number;
  expiredDate: Date;
  levelId: number;
  status: boolean;
  companyId: number;
  locations: Location[];
  fields: Field[];
  jobDetail: JobDetail;
}

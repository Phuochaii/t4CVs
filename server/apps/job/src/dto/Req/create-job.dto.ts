export class CreateJobDto {
  id?: number;
  titleRecruitment: string;
  majorId: number;
  fieldsId: number[];
  typeId: number;
  currencyId: number;
  levelId: number;
  campaignId: number;
  companyId: number;
  salaryMin: number;
  salaryMax: number;
  expId: number;
  locationsId: number[];
  expiredDate: string;
  quantity: number;
  jobSchedule: string;
  gender: string;
  description: string;
  benefit: string;
  requirement: string;
  skill: string;
}

export class CreateJobDto {
  id?: number;
  status?: boolean;
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
  locationId: number[];
  expiredDate: string;
  quantity: string;
  jobSchedule: string;
  gender: string;
  description: string;
  benefit: string;
  requirement: string;
  skills: string;
}

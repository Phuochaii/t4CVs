import { FindOperator } from 'typeorm';

export class QueryDTO {
  page?: number;
  limit?: number;
  locationId?: number;
  fieldId?: number;
  majorId?: number;
  levelId?: number;
  currencyId?: number;
  salaryMin?: number;
  salaryMax?: number;
  expId?: number;
  typeId?: number;
  titleRecruitment?: string | FindOperator<string>;
  campaignId?: number;
  companyId?: number;
  status?: boolean;
}

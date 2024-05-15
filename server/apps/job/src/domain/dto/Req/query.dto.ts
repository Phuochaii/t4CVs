import { FindOperator } from 'typeorm';

export class QueryDTO {
  page?: number;
  limit?: number;
  locationId?: number;
  fieldId?: number;
  majorId?: number;
  levelId?: number;
  currencyId?: number;
  salaryMin?: number | FindOperator<number>;
  salaryMax?: number | FindOperator<number>;
  expiredDate?: Date | FindOperator<Date>;
  expId?: number;
  typeId?: number;
  titleRecruitment?: string | FindOperator<string>;
  campaignId?: number;
  companyId?: number;
  status?: boolean;
}

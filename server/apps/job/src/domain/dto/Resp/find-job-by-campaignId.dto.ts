import { JobDetail, Location } from '../../entities';

export class FindJobByCampaignIdDto {
  id: number;
  titleRecruitment: string;
  companyId: number;
  salaryMax: number;
  salaryMin: number;
  campaignId: number;
  status: boolean;
  expiredDate: Date;
  jobDetail: JobDetail;
  locations: Location[];
}

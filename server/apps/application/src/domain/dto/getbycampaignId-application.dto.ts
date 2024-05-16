export class GetByCampaignIdApplicationDto {
  page: number;
  limit: number;
  campaignIds: number[];
  status?: boolean | undefined;
}

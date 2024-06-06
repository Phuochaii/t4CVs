export class GetByCampaignIdWithPaginationDto {
  page: number;
  limit: number;
  campaignIds: number[];
  status?: boolean | undefined;
}

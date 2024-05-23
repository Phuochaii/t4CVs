export class GetByUserIdPaginationApplicationDto {
  page: number;
  limit: number;
  userId: string;
  status?: boolean | undefined;
}

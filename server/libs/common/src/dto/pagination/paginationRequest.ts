export class PaginationRequest {
  page: number;
  limit: number;

  constructor(
    { page, limit }: { page: number; limit: number } = { page: 1, limit: 10 },
  ) {
    this.page = page > 0 ? page : 1;
    this.limit = limit > 0 ? limit : 10;
  }

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}

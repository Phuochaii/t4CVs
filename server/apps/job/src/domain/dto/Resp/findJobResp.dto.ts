import { JobAggregate } from '../../aggregate';

export class FindJobRespDTO {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  data: JobAggregate[];
}

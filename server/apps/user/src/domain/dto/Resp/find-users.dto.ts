import { User } from '../../entities';

export class FindUserRespDTO {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  data: User[];
}

import { CreateEmployerDTO } from './dto';
import { Employer } from './entity';
import {
  CreateEmployerService,
  GetEmployerByIdService,
  GetEmployerService,
  GetTotalEmployerService,
} from './service';

export class EmployerApplication {
  constructor(
    private readonly createEmployerService: CreateEmployerService,
    private readonly getAllEmployerService: GetEmployerService,
    private readonly getTotalEmployerService: GetTotalEmployerService,
    private readonly getEmployerByIdService: GetEmployerByIdService,
  ) {}

  async createEmployer(request: CreateEmployerDTO): Promise<Employer> {
    return await this.createEmployerService.execute(request);
  }

  async getAllEmployer(page: number, limit: number): Promise<Employer[]> {
    return await this.getAllEmployerService.execute(page, limit);
  }

  async getTotalEmployer(): Promise<number> {
    return await this.getTotalEmployerService.execute();
  }

  async getEmployerById(id: string): Promise<Employer> {
    return await this.getEmployerByIdService.execute(id);
  }
}

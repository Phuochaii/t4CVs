import { CreateEmployerDTO } from '../dto';
import { Employer } from '../entity';

export abstract class EmployerRepository {
  abstract getAllEmployer(page: number, limit: number): Promise<Employer[]>;

  abstract getEmployerById(id: string): Promise<Employer>;

  abstract createEmployer(employer: CreateEmployerDTO): Promise<Employer>;

  abstract getTotalEmployer(): Promise<number>;
}

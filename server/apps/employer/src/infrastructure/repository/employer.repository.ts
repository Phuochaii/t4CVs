import { Repository } from 'typeorm';
import { EmployerRepository } from '../../domain/repository';
import { EmployerSchema } from '../schema';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployerDTO } from '../../domain/dto';
import { Employer } from '../../domain/entity';

export class TypeOrmEmployerRepository extends EmployerRepository {
  constructor(
    @InjectRepository(EmployerSchema)
    private readonly employerRepository: Repository<EmployerSchema>,
  ) {
    super();
  }

  async getAllEmployer(page: number, limit: number): Promise<Employer[]> {
    const skip = (page - 1) * limit;

    const employers = await this.employerRepository.find({
      skip: skip,
      take: limit,
    });

    return employers;
  }

  async getEmployerById(id: string): Promise<Employer> {
    const result = await this.employerRepository.findOne({
      where: {
        id,
      },
    });
    return result;
  }

  async createEmployer(employer: CreateEmployerDTO): Promise<Employer> {
    return await this.employerRepository.save(employer);
  }

  async getTotalEmployer(): Promise<number> {
    const total = await this.employerRepository.count();

    return total;
  }
}

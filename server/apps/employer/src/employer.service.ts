import { Injectable } from '@nestjs/common';
import { FindEmployerDTOResponse } from './dto/Res/find_employer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employer } from './entities/employer.entities';
import { CreateEmployerDto } from './dto/Req/create-employer.dto';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private EmployerRepository: Repository<Employer>,
  ) {}

  async createEmployer(createEmployerDto: CreateEmployerDto) {
    const employer = await this.EmployerRepository.save(createEmployerDto);

    return await this.EmployerRepository.save(employer);
  }

  async findAllEmployers(
    page: number,
    limit: number,
  ): Promise<FindEmployerDTOResponse[]> {
    const skip = (page - 1) * limit;
    const employers = await this.EmployerRepository.find({
      skip: skip,
      take: limit,
    });

    return employers;
  }

  async getTotalEmployers(): Promise<number> {
    const total = await this.EmployerRepository.count();

    return total;
  }

  async findEmployerById(id: number) {
    const result = await this.EmployerRepository.findOne({
      where: {
        id,
      },
    });
    return result;
  }
}

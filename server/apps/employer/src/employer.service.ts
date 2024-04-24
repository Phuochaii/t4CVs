import { Injectable } from '@nestjs/common';
import { FindEmployerDTOResponse } from './dto/Res/find_employer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employer } from './entities/employer.entities';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private EmployerRepository: Repository<Employer>,
  ) {}

  async findAllEmployers(): Promise<FindEmployerDTOResponse[]> {
    const positions = await this.EmployerRepository.find();
    return positions;
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

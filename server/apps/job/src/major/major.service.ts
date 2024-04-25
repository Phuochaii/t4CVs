import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Major } from '../entities/major.entity';
import { CreateBaseDto } from '../dto/Req/createBase.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MajorService {
  constructor(
    @InjectRepository(Major)
    private majorRepository: Repository<Major>,
  ) {}

  async findAll(): Promise<Major[]> {
    return this.majorRepository.find();
  }

  async findById(id: number): Promise<Major> {
    return this.majorRepository.findOneBy({ id });
  }

  create(majors: CreateBaseDto): string {
    majors.name.map(async (name) => {
      const _major = await this.majorRepository.findOne({
        where: { name: name },
      });
      if (_major === null) {
        await this.majorRepository.save({ name });
      }
    });
    return 'Create major successfully!';
  }
}

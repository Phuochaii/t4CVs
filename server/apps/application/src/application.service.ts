import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './entities/application.entity';
@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}
  async store(data: CreateApplicationDto) {
    try {
      const guest = this.applicationRepository.create(data);
      return await this.applicationRepository.save(guest);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneOrFail(id: number) {
    try {
      // console.log(id);
      // return id;
      const guest = await this.applicationRepository.findOneBy({ id });
      if (!guest) {
        return 'lỗi';
      }
      return guest;
      // return await this.applicationRepository.findOneBy({ id });
    } catch {
      console.log(id);
      throw new NotFoundException();
    }
  }

  async findAll() {
    try {
      const jobs = await this.applicationRepository.find();
      return jobs;
    } catch (error) {
      console.log('lỗi');
      throw new NotFoundException(error.message);
    }
  }
}

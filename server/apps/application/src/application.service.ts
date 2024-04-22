import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './entities/application.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ApplicationService {
  private readonly applications: Application[] = [];
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}
  async store(data: CreateApplicationDto) {
    try {
      const application = this.applicationRepository.create(data);
      application.status = 0;
      console.log(data);
      return await this.applicationRepository.save(application);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneOrFail(id: number) {
    try {
      const guest = await this.applicationRepository.findOneBy({ id });
      return guest;
    } catch {
      console.log(id);
      throw new NotFoundException();
    }
  }

  // async findAll() {
  //   try {
  //     // console.log(this.applicationRepository.find());
  //     const data = await this.applicationRepository.find();
  //     console.log('service not gateway apply');
  //     // console.log(data);
  //     return data;
  //   } catch (error) {
  //     console.log('lỗi:', error);
  //     throw new NotFoundException(error.message);
  //   }
  // }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const data = await this.applicationRepository.find({
      skip: skip,
      take: limit,
    });
    return data;
  }

  async delete(id: number) {
    await this.applicationRepository.delete(id);
  }

  async update(id: number) {
    const application = await this.applicationRepository.findOneBy({ id });
    application.status = 1;
    const updatedApplication =
      await this.applicationRepository.save(application);

    return updatedApplication;
  }
}

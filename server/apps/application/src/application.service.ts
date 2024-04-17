import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { ApplicationRepository } from './application.repository';
import { CreateApplicationDto } from './dto/create-application.dto';
// import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
@Injectable()
export class ApplicationService {
  // private readonly application: Application[] = [];

  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  // async addApplication(createApplicationDto: CreateApplicationDto) {
  //   return await this.applicationRepository.create(createApplicationDto);
  // }

  // async getOneSubscriber(updateApplicationDto: UpdateApplicationDto) {
  //   return await this.applicationRepository.find(updateApplicationDto);
  // }
  async store(data: CreateApplicationDto) {
    try {
      const guest = this.applicationRepository.create(data);
      return await this.applicationRepository.save(guest);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneOrFail(id: number) {
    console.log(111111111111111111111111111111111111111111111111n);
    return await this.applicationRepository.findOneBy({ id });
    // try {
    //   return await this.applicationRepository.findOneBy({ id });
    // } catch {
    //   throw new NotFoundException();
    // }
  }
}

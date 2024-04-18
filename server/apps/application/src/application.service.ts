import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './entities/application.entity';
// import { DeleteApplicationRequest, UpdateApplicationRequest } from '@app/common';
@Injectable()
export class ApplicationService {
  private readonly application12: any[] = [];
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
      // console.log(id);
      // return id;
      const guest = await this.applicationRepository.findOneBy({ id });
      return guest;
      // return await this.applicationRepository.findOneBy({ id });
    } catch {
      console.log(id);
      throw new NotFoundException();
    }
  }

  async findAll() {
    try {
      const application12 = await this.applicationRepository.find();
      return application12;
      console.log(application12);
    } catch (error) {
      console.log('lỗi');
      throw new NotFoundException(error.message);
    }
  }

  async delete(id: number) {
    const application = await this.applicationRepository.findOneBy({ id });
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

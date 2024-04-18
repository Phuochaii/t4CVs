import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './entities/application.entity';
import { map, mergeAll } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
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
      const guest = await this.applicationRepository.findOneBy({ id });
      return guest;
    } catch {
      console.log(id);
      throw new NotFoundException();
    }
  }

  // async findAll(): Promise<Observable<Application>> {
  //   try {
  //     // let applications1: any[] = [];
  //     // applications1 = await this.applicationRepository.find();
  //     // console.log(applications1);
  //     // return applications1;
  //     const applications = this.applicationRepository.find().pipe(
  //       catchError((error) => {
  //         console.log('lỗi:', error);
  //         return throwError(new NotFoundException(error.message));
  //       }),
  //     );
  //     console.log(applications);
  //     return applications;
  //   } catch (error) {
  //     console.log('lỗi:', error);
  //     throw new NotFoundException(error.message);
  //   }
  // }
  findAll(): Observable<Application> {
    try {
      return from(this.applicationRepository.find()).pipe(
        mergeAll(),
        map((application) => application),
      );
    } catch (error) {
      console.log('lỗi:', error);
      throw new NotFoundException(error.message);
    }
  }

  async delete(id: number) {
    // const application = await this.applicationRepository.findOneBy({ id });
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

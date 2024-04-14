import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationRequest, ReadApplicationRequest } from '@app/common';
import { Application } from './entities/application.entity';
import { v4 as randomUUID } from 'uuid'; // Import randomUUID

@Injectable()
export class ApplicationService {
  private readonly application: Application[] = [];

  findById(readApplication: ReadApplicationRequest): Promise<Application> {
    return new Promise((resolve, reject) => {
      const application = this.application.find(
        (app) => app.id === readApplication.id,
      );
      if (application) {
        resolve(application);
      } else {
        reject(
          new NotFoundException(
            `Application with ID ${readApplication.id} not found.`,
          ),
        );
      }
    });
  }

  findAll(): Application[] {
    return this.application;
  }

  create(createApplication: CreateApplicationRequest): Application {
    const application: Application = {
      id: randomUUID(),
      fullname: createApplication.fullname,
      phone: createApplication.phone,
      email: createApplication.email,
      cvId: createApplication.cvId,
      status: 1,
      coverLetter: '',
      createdAt: '',
      updateAt: '',
      jobId: 0,
      userId: 0,
    };
    this.application.push(application); // Corrected the variable name to plural
    return application;
  }
}

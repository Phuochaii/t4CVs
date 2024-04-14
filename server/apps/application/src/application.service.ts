// import { CreateApplicationDto } from './dto/create-application.dto';
// import { UpdateApplicationDto } from './dto/update-application.dto';
// import { Application, CreateApplicationDTO, UpdateApplicationDTO } from '@app/common';
// import { Application } from './entities/application.entity';

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Application } from './entities/application.entity';
// import { CreateApplicationRequest } from '@app/common/proto/application';

import { Injectable } from '@nestjs/common';
import {
  // User,
  CreateApplicationRequest,
  ReadApplicationRequest,
  // Users,
  // PaginationDto,
  Application
} from '@app/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ApplicationService {
  private readonly application: Application[] = [];
  findAll(): Application {
    return { Application: this.Application };
  }

  create(createApplication: CreateApplicationRequest) {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      socialMedia: {},
      id: randomUUID(),
    };
    this.users.push(user);
    return user;
  }
}

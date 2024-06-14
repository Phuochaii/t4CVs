import { Injectable } from '@nestjs/common';
import { ApplicationDomain } from '../domain/application.application';
import { CreateApplicationDto, UpdateApplicationDto } from '../domain/dto';

@Injectable()
export class CommandService {
  constructor(private readonly applicationDomain: ApplicationDomain) {}
  async createApplication(request: CreateApplicationDto) {
    return await this.applicationDomain.createApplication(request);
  }

  async updateApplication(request: UpdateApplicationDto) {
    return await this.applicationDomain.updateApplication(request);
  }
}

import { CreateApplicationDto } from '../dto';
import { Application } from '../entity';
import { ApplicationCreatedEvent } from '../event';
import { ApplicationRepository } from '../repository';

export class ApplicationFactory {
  constructor(private readonly applicationRepository: ApplicationRepository) {}
  async createApplication(input: CreateApplicationDto): Promise<Application> {
    const application = new Application();
    const id = await this.applicationRepository.getNextId();
    const now = new Date();
    application.raiseEvent(
      new ApplicationCreatedEvent({
        id,
        status: false,
        fullname: input.fullname,
        phone: input.phone,
        email: input.email,
        coverLetter: input.coverLetter,
        createdAt: now.toISOString(),
        updateAt: now.toISOString(),
        campaignId: input.campaignId,
        userId: input.userId,
        cvId: input.cvId,
      }),
    );

    return application;
  }
}

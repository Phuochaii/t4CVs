import { CreateApplicationDto } from '../dto';
import { Application } from '../entity';
import { ApplicationCreatedEvent } from '../event';
import { ApplicationRepository } from '../repository';

export class ApplicationFactory {
  constructor(private readonly applicationRepository: ApplicationRepository) {}
  async createApplication(input: CreateApplicationDto): Promise<Application> {
    const application = new Application();
    console.log('application: ', application);
    console.log(
      'application uncommited events:',
      application.getUnCommitedEvents(),
    );
    const id = await this.applicationRepository.getNextId();
    application.raiseEvent(
      new ApplicationCreatedEvent({
        id: id,
        ...input,
      }),
    );

    return application;
  }
}

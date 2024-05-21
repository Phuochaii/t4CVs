import { Application } from '../entity';

export enum ApplicationStatus {
  UNREAD = 0,
  READ = 1,
}

export class ApplicationAggregate {
  //   user: User;
  application: Application;
  status: ApplicationStatus;
}

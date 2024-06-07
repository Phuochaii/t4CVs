import { BaseEntity, IEvent } from '@app/common/domain';
import { ApplicationCreatedEvent } from '../event';

export class Application extends BaseEntity {
  status: boolean;
  fullname: string;
  phone: string;
  email: string;
  coverLetter: string;
  createdAt: string;
  updateAt: string;
  campaignId: number;
  userId: string;
  cvId: number;

  async applyApplicationCreatedEvent(event: ApplicationCreatedEvent) {
    this.id = event.data.id;
    this.status = event.data.status;
    this.fullname = event.data.fullname;
    this.phone = event.data.phone;
    this.email = event.data.email;
    this.coverLetter = event.data.coverLetter;
    this.createdAt = event.data.createdAt;
    this.updateAt = event.data.updateAt;
    this.campaignId = event.data.campaignId;
    this.userId = event.data.userId;
    this.cvId = event.data.cvId;
  }

  async applyEvent(event: IEvent): Promise<void> {
    if (event instanceof ApplicationCreatedEvent) {
      await this.applyApplicationCreatedEvent(event);
      return;
    }
    throw new Error(
      `${this.constructor.name} cannot apply ${event.constructor.name} event`,
    );
  }
}

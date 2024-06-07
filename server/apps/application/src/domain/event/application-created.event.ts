import { IEvent } from '@app/common/domain/event.interface';
import { CreateApplicationDto } from '../dto';
import { Application } from '../entity';

export class ApplicationCreatedEvent implements IEvent {
  constructor(
    public readonly data: CreateApplicationDto & { id: Application['id'] },
  ) {}
}

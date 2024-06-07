import { IEvent } from '@app/common/domain/event.interface';
import { Application } from '../entity';
import { ClassProperties } from '@app/common/type';

export class ApplicationCreatedEvent implements IEvent {
  constructor(
    public readonly data: ClassProperties<Application>,
  ) {}
}

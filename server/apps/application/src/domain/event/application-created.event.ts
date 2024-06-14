import { IEvent } from '@app/common/domain/event.interface';
import { Application } from '../entity';
import { ClassProperties } from '@app/common/type';
import { BaseEntity } from 'typeorm';

export class ApplicationCreatedEvent implements IEvent {
  constructor(
    public readonly data: Omit<ClassProperties<Application>, keyof BaseEntity>,
  ) {}
}

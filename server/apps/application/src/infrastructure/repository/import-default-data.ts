import { Injectable } from '@nestjs/common';
import { applications } from './database/data';
import { ApplicationCreatedEvent } from 'apps/application/src/domain/event';
import { IEventDispatcher } from '@app/common/domain';

@Injectable()
export class DefaultDataImporter {
  constructor(private readonly eventDispatcher: IEventDispatcher) {}
  async importDefaultData(): Promise<void> {
    const events = applications.map((application) => {
      return new ApplicationCreatedEvent(application);
    });
    for(const event of events) {
      this.eventDispatcher.dispatch(event);
    }
  }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  ApplicationUpdatedEvent,
} from '../../../../domain/event';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationSchema } from '../schema';
import { Repository } from 'typeorm';

@EventsHandler(ApplicationUpdatedEvent)
export class ApplicationUpdatedProjection
  implements IEventHandler<ApplicationUpdatedEvent>
{
  constructor(
    @InjectRepository(ApplicationSchema)
    private readonly applicationRepository: Repository<ApplicationSchema>,
  ) {}
  async handle(event: ApplicationUpdatedEvent) {
    const { id, status } = event.data;
    const result = await this.applicationRepository.update(id, {
        status,
    });
  }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ApplicationCreatedEvent } from '../../../domain/event';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationSchema } from '../schema';
import { Repository } from 'typeorm';

@EventsHandler(ApplicationCreatedEvent)
export class ApplicationCreatedProjection
  implements IEventHandler<ApplicationCreatedEvent>
{
  constructor(
    @InjectRepository(ApplicationSchema)
    private readonly applicationRepository: Repository<ApplicationSchema>,
  ) {}
  async handle(event: ApplicationCreatedEvent) {
    const result = await this.applicationRepository.save(event.data);
  }
}

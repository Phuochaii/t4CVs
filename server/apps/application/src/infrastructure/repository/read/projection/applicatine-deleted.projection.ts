import { EventsHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationSchema } from '../schema';
import { Repository } from 'typeorm';
import { ApplicationDeletedEvent } from 'apps/application/src/domain/event';

@EventsHandler(ApplicationDeletedEvent)
export class ApplicationDeletedProjection {
  constructor(
    @InjectRepository(ApplicationSchema)
    private readonly applicationRepository: Repository<ApplicationSchema>,
  ) {}
  async handle(event: ApplicationDeletedEvent) {
    await this.applicationRepository.delete(event.data.id);
  }
}

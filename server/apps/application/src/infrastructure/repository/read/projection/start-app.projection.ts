import { InjectRepository } from '@nestjs/typeorm';
import { EventStoreRepository } from '../../write/event-store.repository';
import { ApplicationSchema } from '../schema';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StartAppProjection {
  constructor(
    @InjectRepository(ApplicationSchema)
    private readonly applicationRepository: Repository<ApplicationSchema>,
    private readonly eventStoreRepository: EventStoreRepository,
  ) {
    this.reconstruct();
  }
  async reconstruct(): Promise<void> {
    const state = await this.eventStoreRepository.getCurrentState();
    await this.applicationRepository.save(state.applications);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEmployerDto } from 'apps/employer/src/dto/Req/create-employer.dto';
import { FindEmployerDTOResponse } from 'apps/employer/src/dto/Res/find_employer.dto';

@Injectable()
export class EmployerService {
  constructor(
    @Inject('EMPLOYER') private readonly employerClient: ClientProxy,
  ) {}

  createEmployer(createEmployerDTO: CreateEmployerDto): Observable<string> {
    return this.employerClient.send(
      { cmd: 'create_employer' },
      createEmployerDTO,
    );
  }

  getAllEmployers(page: number, limit: number): Observable<string> {
    return this.employerClient.send(
      { cmd: 'get_all_employers' },
      { page, limit },
    );
  }

  findEmployerById(id: number): Observable<FindEmployerDTOResponse> {
    return this.employerClient.send<FindEmployerDTOResponse>(
      { cmd: 'find_employer_by_id' },
      id,
    );
  }

  getAllPositions(): Observable<string> {
    return this.employerClient.send({ cmd: 'get_all_positions' }, {});
  }

  findPositionById(id: number): Observable<string> {
    return this.employerClient.send({ cmd: 'find_position_by_id' }, id);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEmployerDto } from './dto/Req/createEmployer.dto';
import { FindEmployerDTOResponse } from './dto/Res/find_employer.dto';
import { AuthenticationService } from '../authentication/authentication.service';
import { Role } from '../authentication/dto/role.dto';

@Injectable()
export class EmployerService {
  constructor(
    @Inject('EMPLOYER') private readonly employerClient: ClientProxy,
    private readonly authenticationService: AuthenticationService,
  ) { }

  async createEmployer(createEmployerDTO: CreateEmployerDto): Promise<Observable<string>> {
    await this.authenticationService.asignRole({
      userId: createEmployerDTO.id,
      role: Role.HR,
    });
    await this.authenticationService.setUpProfile({
      id: createEmployerDTO.id,
      name: createEmployerDTO.fullname,
    });
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

  findEmployerById(id: string): Observable<FindEmployerDTOResponse> {
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

  checkEmployer(id: string): Observable<boolean> {
    return this.employerClient.send({ cmd: 'check_employer' }, id);
  }

  canUpdateProfile(id: string): Promise<boolean> {
    return this.authenticationService.canUpdateProfile(id);
  }
}

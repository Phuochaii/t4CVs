import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient } from 'auth0';
import { Role } from './dto/role.dto';



@Injectable()
export class AuthenticationService {
  auth0: ManagementClient;
  constructor(
    configService: ConfigService,
  ) { 
    this.auth0 = new ManagementClient({
      domain: configService.get<string>('AUTH0_MANAGEMENT_DOMAIN'),
      clientId: configService.get<string>('AUTH0_MANAGEMENT_CLIENTID'),
      clientSecret: configService.get<string>('AUTH0_MANAGEMENT_CLIENTSECRET'),
    })
  }

  private toRoleId(role: Role): string {
    switch (role) {
      case Role.HR:
        return 'rol_4wasemaT4OBxjkc7';
      case Role.USER:
        return 'rol_AFQBjsbAu9EwZMWg';
      default:
        throw new InternalServerErrorException('Invalid role');
    }
  }


  private async asignRole({
    userId,
    role,
  }: {
    userId: string,
    role: Role,
  }) {
    const response = await this.auth0.users.assignRoles(
      {
        id: userId,
      },
      {
        roles: [this.toRoleId(role)],
      }
    );
    return response;
  }


  async setRoleForUser({
    userId,
    role,
  }: {
    userId: string,
    role: Role,
  }) {
    await this.asignRole({
      userId,
      role,
    });
  }

}

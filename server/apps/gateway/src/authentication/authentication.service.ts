import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient } from 'auth0';
import { Role } from './dto/role.dto';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AuthenticationService {
  auth0: ManagementClient;
  constructor(configService: ConfigService) {
    this.auth0 = new ManagementClient({
      domain: configService.get<string>('AUTH0_MANAGEMENT_DOMAIN'),
      clientId: configService.get<string>('AUTH0_MANAGEMENT_CLIENTID'),
      clientSecret: configService.get<string>('AUTH0_MANAGEMENT_CLIENTSECRET'),
    });
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

  async asignRole({ userId, role }: { userId: string; role: Role }) {
    const response = await this.auth0.users.assignRoles(
      {
        id: userId,
      },
      {
        roles: [this.toRoleId(role)],
      },
    );
    return response;
  }

  async createAccount({ email, password }: CreateAccountDto) {
    const response = await this.auth0.users.create({
      email,
      password,
      connection: 'Username-Password-Authentication',
      email_verified: false,
    });
    return response;
  }

  async getNameAndPicture(userId: string) {
    const user = (await this.auth0.users.get({ id: userId })).data;
    return {
      name: user.name,
      picture: user.picture,
    };
  }
}

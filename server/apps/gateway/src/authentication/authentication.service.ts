import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient } from 'auth0';
import { Role } from './dto/role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SetUpProfileDto } from './dto/setup-profile.dto';
import { CreateHrDto } from './dto/create-hr.dto';



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

  async asignRole({
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

  async createUserAccount({
    email, password, fullname,
  }: CreateUserDto) {
    const response = await this.auth0.users.create({
      email,
      password,
      connection: 'Username-Password-Authentication',
      email_verified: false,
      name: fullname,
    });
    await this.asignRole({
      userId: response.data.user_id,
      role: Role.USER,
    });
    return response;
  }

  async createHrAccount({
    email, password,
  }: CreateHrDto) {
    const response = await this.auth0.users.create({
      email,
      password,
      connection: 'Username-Password-Authentication',
      email_verified: false,
    });
    await this.asignRole({
      userId: response.data.user_id,
      role: Role.HR,
    });
    return response;
  }

  async setUpProfile({
    id, name
  }: SetUpProfileDto) {
    const response = await this.auth0.users.update(
      { id: id },
      {
        name,
      }
    );
    return response;
  }

  async canUpdateProfile(id: string) {
    const response = await this.auth0.users.get({ id });
    try {
      await this.setUpProfile({
        id,
        name: response.data.name,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

}

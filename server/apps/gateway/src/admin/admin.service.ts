import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AdminService {
  constructor(private readonly authenticationService: AuthenticationService) {}
  isAdmin(): boolean {
    return true;
  }

  async getProfile(id: string): Promise<{
    name: string;
    picture: string;
  }> {
    return await this.authenticationService.getNameAndPicture(id);
  }
}

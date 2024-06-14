import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, PermissionsGuard, UserClaims } from '../authorization';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Get('check')
  isAdmin(): boolean {
    return this.adminService.isAdmin();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Get('profile')
  getProfile(@GetUser() user: UserClaims): Promise<{
    name: string;
    picture: string;
  }> {
    return this.adminService.getProfile(user.sub);
  }
}

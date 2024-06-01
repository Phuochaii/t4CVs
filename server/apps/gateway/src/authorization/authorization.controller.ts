import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from './permission/permissions.guard';
import { GetUser } from './get-user.decorator';
import { UserClaims } from './entity/user-claims.entity';

@Controller('authorization')
export class AuthorizationController {
    @UseGuards(AuthGuard('jwt'))
    @Get('auth')
    getAuth() {
        return "You're authenticated!";
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
    @Get('user')
    getUser() {
        return "You're user!";
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
    @Get('hr')
    getHr() {
        return "You're hr!";
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
    @Get('admin')
    getAdmin() {
        return "You're admin!";
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('req/user')
    getUserClaim(@GetUser() user: UserClaims) {
        return user;
    }
}

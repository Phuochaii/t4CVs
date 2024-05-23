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

    @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
    @Get('hr')
    getHr() {
        return "You're hr!";
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('req/user')
    getAdmin(@GetUser() user: UserClaims) {
        return user;
    }
}

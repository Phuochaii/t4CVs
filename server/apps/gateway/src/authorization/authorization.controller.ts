import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from './permissions/permissions.guard';
import { Permissions } from './permissions/permissions.decorator';

@Controller('authorization')
export class AuthorizationController {
    @UseGuards(AuthGuard('jwt'))
    @Get('auth')
    getAuth(): string {
        return "You're authenticated!";
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Get('hr')
    @Permissions('role:hr')
    getHr(): string {
        return "You're hr!";
    }
}

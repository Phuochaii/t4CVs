import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthorizationController } from './authorization.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [JwtStrategy, ConfigService],
    exports: [PassportModule],
    controllers: [AuthorizationController],
})
export class AuthorizationModule { }

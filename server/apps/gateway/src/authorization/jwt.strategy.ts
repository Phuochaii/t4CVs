import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa'
import { UserClaims } from './entity/user-claims.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: configService.get('AUTH0_AUDIENCE'),
            issuer: `${configService.get('AUTH0_ISSUER_URL')}`,
            algorithms: ['RS256'],
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${configService.get('AUTH0_ISSUER_URL')}.well-known/jwks.json`
            }),
        });
    }
    async validate(payload: UserClaims): Promise<UserClaims> {
        return payload;
    }
}

import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthenticatedRequest } from './dto/authenticated-request.dto';
import { UserClaims } from './entity/user-claims.entity';

export const GetUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): UserClaims => {
        const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>();
        if(!user) throw new UnauthorizedException('Not authenticated');
        return user;
    }
);
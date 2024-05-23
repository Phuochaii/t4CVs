import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Permission } from './permissions.type';
import { AuthenticatedRequest } from '../dto/authenticated-request.dto';



export const PermissionsGuard = (permission: Permission) => {
  @Injectable()
  class Guard implements CanActivate {
    constructor(
      public readonly reflector: Reflector, // Change access modifier to public
    ) { }
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const routePermissions = [permission]
      console.log("routePermissions: ", routePermissions)
      if (!routePermissions) {
        return true;
      }
  
      const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>();
      if(!user) throw new UnauthorizedException('Not authenticated');
      const userPermissions = user.permissions;
      console.log("userPermissions: ",userPermissions)

      const hasPermission =
        routePermissions.every(routePermission =>
          userPermissions.includes(routePermission),
        );
  
      return hasPermission;
    }
  }
  return Guard;
}
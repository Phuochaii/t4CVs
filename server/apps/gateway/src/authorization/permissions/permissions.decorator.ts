import { SetMetadata } from '@nestjs/common';

export type Permission = 'role:hr' | 'role:admin' | 'role:user';
export const PERMISSION_KEY = 'permissions';
export const Permissions = (...args: Permission[]) => SetMetadata(PERMISSION_KEY, args);
import { Routes } from 'nest-router';
import { UserModule } from './modules/user/user.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthController } from './modules/core/auth/auth.controller';

export const appRoutes: Routes = [
  {
    path: '/users',
    module: UserModule,
  },
  {
    path: '/roles',
    module: RolesModule,
  },
  {
    path: '/auth',
    module: AuthController,
  },
];

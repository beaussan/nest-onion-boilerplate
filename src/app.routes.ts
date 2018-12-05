import { Routes } from 'nest-router';

import { UserModule } from './modules/user/user.module';
import { RolesModule } from './modules/roles/roles.module';
// needle-module-import

export const appRoutes: Routes = [
  {
    path: '/users',
    module: UserModule,
  },
  {
    path: '/roless',
    module: RolesModule,
  },
  // needle-modules-routes
];

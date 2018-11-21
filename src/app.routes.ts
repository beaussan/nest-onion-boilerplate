import { Routes } from 'nest-router';

import { UserModule } from './modules/user/user.module';
// needle-module-import

export const appRoutes: Routes = [
  {
    path: '/users',
    module: UserModule,
  },
  // needle-modules-routes
];

import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () => import('src/app/auth/auth.routes').then(r => r.authRoutes)
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/auth/auth.routes').then(r => r.loginRoutes)
  }
];

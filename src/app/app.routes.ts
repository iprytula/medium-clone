import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth.routes').then(r => r.authRoutes)
  }
];

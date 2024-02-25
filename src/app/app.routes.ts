import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('src/app/global-feed/global-feed.routes').then(r => r.globalFeedRoutes)
  },
  {
    path: 'register',
    loadChildren: () => import('src/app/auth/auth.routes').then(r => r.registerRoutes)
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/auth/auth.routes').then(r => r.loginRoutes)
  }
];

import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('src/app/global-feed/global-feed.routes').then(r => r.globalFeedRoutes)
  },
  {
    path: 'feed',
    loadChildren: () => import('src/app/your-feed/your-feed.routes').then(r => r.yourFeedRoutes)
  },
  {
    path: 'tags/:slug',
    loadChildren: () => import('src/app/tag-feed/tag-feed.routes').then(r => r.tagFeedRoutes)
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

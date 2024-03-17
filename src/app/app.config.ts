import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as authEffects from 'src/app/store/effects/auth.effects';
import * as feedEffects from 'src/app/store/effects/feed.effects';
import * as popularTagsEffects from 'src/app/store/effects/popular-tags.effects';
import * as articleEffects from 'src/app/store/effects/article.effects';
import { authFeatureKey, authReducer } from 'src/app/store/reducers/auth.reducer';
import { appRoutes } from './app.routes';
import { authInterceptor } from './shared/services/auth.interceptor';
import { feedFeatureKey, feedReducer } from './store/reducers/feed.reducer';
import { popularTagsFeatureKey, popularTagsReducer } from './store/reducers/popular-tags.reducer';
import { articleFeatureKey, articleReducer } from './store/reducers/article.reducer';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer
    }),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideState(articleFeatureKey, articleReducer),
    provideEffects(authEffects, feedEffects, popularTagsEffects, articleEffects),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    })
  ],
};

import { Route } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import * as articleEffects from 'src/app/store/effects/article.effects';
import { articleFeatureKey, articleReducer } from "../store/reducers/article.reducer";
import { ArticleComponent } from "./components/article/article.component";

export const articleRoutes: Route[] = [
  {
    path: '', component: ArticleComponent, providers: [
      provideState(articleFeatureKey, articleReducer),
      provideEffects(articleEffects)
    ]
  }
];
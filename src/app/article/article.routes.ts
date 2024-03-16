import { Route } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import * as articleEffects from 'src/app/store/effects/article.effects';
import { articleFeatureKey, articleReducer } from "../store/reducers/article.reducer";
import { ArticleNewComponent } from "./components/article-new/article-new.component";
import { ArticleUpdateComponent } from "./components/article-update/article-update.component";
import { ArticleComponent } from "./components/article/article.component";

export const articleRoutes: Route[] = [
  { path: 'new', component: ArticleNewComponent },
  { path: 'update/:slug', component: ArticleUpdateComponent },
  {
    path: ':slug', component: ArticleComponent, providers: [
      provideState(articleFeatureKey, articleReducer),
      provideEffects(articleEffects)
    ]
  },
];
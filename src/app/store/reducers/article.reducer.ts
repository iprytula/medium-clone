import { routerNavigationAction } from "@ngrx/router-store";
import { createFeature, createReducer, on } from "@ngrx/store";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { articleActions } from "../actions/article.actions";

export interface ArticleStateInterface {
  data: ArticleInterface | null,
  error: string | null,
  isLoading: boolean
};

const initialState: ArticleStateInterface = {
  data: null,
  error: null,
  isLoading: false
};

const feedFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(articleActions.getArticle, state => ({ ...state, isLoading: true })),
    on(articleActions.getArticleSuccess, (state, { data }) => ({ ...state, isLoading: false, data })),
    on(articleActions.getArticleFailure, state => ({ ...state, isLoading: false })),
    on(routerNavigationAction, () => initialState)
  )
});

export const {
  name: articleFeatureKey,
  reducer: articleReducer,
  selectData: selectArticleData,
  selectIsLoading,
  selectError
} = feedFeature;
import { routerNavigationAction } from "@ngrx/router-store";
import { createFeature, createReducer, on } from "@ngrx/store";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { articleActions } from "../actions/article.actions";
import { BackendErrorsInterface } from "src/app/shared/types/backend-errors.interface";

export interface ArticleStateInterface {
  data: ArticleInterface | null,
  errors: BackendErrorsInterface | null,
  isLoading: boolean,
  isSubmitting: boolean
};

const initialState: ArticleStateInterface = {
  data: null,
  errors: null,
  isLoading: false,
  isSubmitting: false
};

const feedFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(articleActions.getArticle, state => ({ ...state, isLoading: true })),
    on(articleActions.getArticleSuccess, (state, { data }) => ({ ...state, isLoading: false, data })),
    on(articleActions.getArticleFailure, state => ({ ...state, isLoading: false })),
    on(articleActions.createArticle, state => ({ ...state, isSubmitting: true })),
    on(articleActions.createArticleSuccess, (state) => ({ ...state, isSubmitting: false })),
    on(articleActions.createArticleFailure, (state, { errors }) => ({ ...state, isSubmitting: false, errors })),
    on(routerNavigationAction, () => initialState)
  )
});

export const {
  name: articleFeatureKey,
  reducer: articleReducer,
  selectData: selectArticleData,
  selectIsLoading,
  selectErrors,
  selectIsSubmitting
} = feedFeature;
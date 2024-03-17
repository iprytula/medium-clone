import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleRequestInterface } from "src/app/shared/types/article-request.interface";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { BackendErrorsInterface } from "src/app/shared/types/backend-errors.interface";

export const articleActions = createActionGroup({
  source: 'article',
  events: {
    getArticle: props<{ slug: string }>(),
    getArticleSuccess: props<{ data: ArticleInterface }>(),
    getArticleFailure: emptyProps(),
    deleteArticle: props<{ slug: string }>(),
    deleteArticleSuccess: emptyProps(),
    deleteArticleFailure: emptyProps(),
    createArticle: props<{ request: ArticleRequestInterface }>(),
    createArticleSuccess: props<{ article: ArticleInterface }>(),
    createArticleFailure: props<{ errors: BackendErrorsInterface }>()
  }
});
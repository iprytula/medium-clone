import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleInterface } from "src/app/shared/types/article.interface";

export const articleActions = createActionGroup({
  source: 'article',
  events: {
    getArticle: props<{ slug: string }>(),
    getArticleSuccess: props<{ data: ArticleInterface }>(),
    getArticleFailure: emptyProps(),
    deleteArticle: props<{ slug: string }>(),
    deleteArticleSuccess: emptyProps(),
    deleteArticleFailure: emptyProps()
  }
});
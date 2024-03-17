import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { articleActions } from "../actions/article.actions";
import { ArticleService } from "../services/article.service";
import { Router } from "@angular/router";

export const getArticleEffect = createEffect((
  actions$ = inject(Actions),
  articleService = inject(ArticleService)
) => {
  return actions$.pipe(
    ofType(articleActions.getArticle),
    switchMap(({ slug }) => {
      return articleService.getArticle(slug).pipe(
        map((data: ArticleInterface) =>
          articleActions.getArticleSuccess({ data })
        ),
        catchError(() =>
          of(articleActions.getArticleFailure())
        )
      )
    })
  )
}, { functional: true });

export const createArticleEffect = createEffect((
  actions$ = inject(Actions),
  articleService = inject(ArticleService),
  router = inject(Router)
) => {
  return actions$.pipe(
    ofType(articleActions.createArticle),
    switchMap(({ request }) => {
      return articleService.createArticle(request).pipe(
        map((article: ArticleInterface) => {
          router.navigateByUrl('/');
          return articleActions.createArticleSuccess({ article })
        }
        ),
        catchError((error) => of(articleActions.createArticleFailure({ errors: error.error.errors }))
        )
      )
    })
  )
}, { functional: true });

export const deleteArticleEffect = createEffect((
  actions$ = inject(Actions),
  articleService = inject(ArticleService)
) => {
  return actions$.pipe(
    ofType(articleActions.getArticle),
    switchMap(({ slug }) => {
      return articleService.deleteArticle(slug).pipe(
        map(() =>
          articleActions.deleteArticleSuccess()
        ),
        catchError(() =>
          of(articleActions.deleteArticleFailure())
        )
      )
    })
  )
}, { functional: true });

export const redirectAfterDeleteEffect = createEffect((
  actions$ = inject(Actions),
  router = inject(Router)
) => {
  return actions$.pipe(
    ofType(articleActions.deleteArticleSuccess),
    tap(() => router.navigateByUrl('/'))
  )
}, { functional: true, dispatch: false });
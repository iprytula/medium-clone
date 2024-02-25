import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { feedActions } from "../actions/feed.actions";
import { GetFeedResponseInterface } from "../../shared/types/get-feed-response.interface";
import { FeedService } from "../services/feed.service";

export const getFeedEffect = createEffect((
  actions$ = inject(Actions),
  feedService = inject(FeedService)
) => {
  return actions$.pipe(
    ofType(feedActions.getFeed),
    switchMap(({ url }) => {
      return feedService.getFeed(url).pipe(
        map((feed: GetFeedResponseInterface) =>
          feedActions.getFeedSuccess({ feed })
        ),
        catchError(() =>
          of(feedActions.getFeedFailure())
        )
      )
    })
  )
}, { functional: true });
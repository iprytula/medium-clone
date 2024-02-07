import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/current-user.interface";
import { authActions } from "../actions/auth.actions";
import { AuthService } from "../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistenceService } from "src/app/shared/services/persistence.service";
import { Router } from "@angular/router";

export const authEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistenceService = inject(PersistenceService)
) => {
  return actions$.pipe(
    ofType(authActions.register),
    switchMap(({ request }) => {
      return authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          persistenceService.set('accessToken', currentUser.token);
          return authActions.registerSuccess({ currentUser })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(authActions.registerFailure({ errors: errorResponse.error.errors }))
        })
      )
    })
  );
}, { functional: true });

export const redirectAfterRegisterEffect = createEffect((
  actions$ = inject(Actions),
  router = inject(Router)
) => {
  return actions$.pipe(
    ofType(authActions.registerSuccess),
    tap(() => router.navigateByUrl('/'))
  );
}, { functional: true, dispatch: false });
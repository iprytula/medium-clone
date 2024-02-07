import { createActionGroup, props } from "@ngrx/store";
import { RegisterRequestInterface } from "src/app/auth/types/register-request.inteface";
import { BackendErrorsInterface } from "src/app/shared/types/backend-errors.interface";
import { CurrentUserInterface } from "src/app/shared/types/current-user.interface";

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    register: props<{ request: RegisterRequestInterface }>(),
    registerSuccess: props<{ currentUser: CurrentUserInterface }>(),
    registerFailure: props<{ errors: BackendErrorsInterface }>()
  }
});
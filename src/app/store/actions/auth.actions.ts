import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginRequestInterface } from "src/app/shared/types/login-request.interface";
import { RegisterRequestInterface } from "src/app/shared/types/register-request.interface";
import { BackendErrorsInterface } from "src/app/shared/types/backend-errors.interface";
import { CurrentUserInterface } from "src/app/shared/types/current-user.interface";

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    register: props<{ request: RegisterRequestInterface }>(),
    registerSuccess: props<{ currentUser: CurrentUserInterface }>(),
    registerFailure: props<{ errors: BackendErrorsInterface }>(),
    
    login: props<{ request: LoginRequestInterface }>(),
    loginSuccess: props<{ currentUser: CurrentUserInterface }>(),
    loginFailure: props<{ errors: BackendErrorsInterface }>(),
  
    getCurrentUser: emptyProps(),
    getCurrentUserSuccess: props<{ currentUser: CurrentUserInterface }>(),
    getCurrentUserFailure: emptyProps()
  }
});
import { createActionGroup, props } from "@ngrx/store";
import { LoginRequestInterface } from "src/app/auth/types/login-request.interface";
import { RegisterRequestInterface } from "src/app/auth/types/register-request.interface";
import { BackendErrorsInterface } from "src/app/shared/types/backend-errors.interface";
import { CurrentUserInterface } from "src/app/shared/types/current-user.interface";

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    RegisterSuccess: props<{ currentUser: CurrentUserInterface }>(),
    RegisterFailure: props<{ errors: BackendErrorsInterface }>(),
    
    Login: props<{ request: LoginRequestInterface }>(),
    LoginSuccess: props<{ currentUser: CurrentUserInterface }>(),
    LoginFailure: props<{ errors: BackendErrorsInterface }>(),
  }
});
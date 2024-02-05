import { createActionGroup, props } from "@ngrx/store";
import { RegisterRequestInterface } from "src/app/shared/types/register-request.inteface";

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    register: props<{ request: RegisterRequestInterface }>()
  }
});
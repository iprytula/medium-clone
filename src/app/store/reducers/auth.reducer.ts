import { createFeature, createReducer, on } from "@ngrx/store";
import { BackendErrorsInterface } from "src/app/shared/types/backend-errors.interface";
import { CurrentUserInterface } from "src/app/shared/types/current-user.interface";
import { authActions } from "../actions/auth.actions";

export interface AuthStateInterface {
  isSubmitting: boolean
  errors: BackendErrorsInterface | null,
  currentUser: CurrentUserInterface | null
}

const initialState: AuthStateInterface = {
  isSubmitting: false,
  errors: null,
  currentUser: null
}

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, state => ({ ...state, isSubmitting: true })),
    on(authActions.registerSuccess, (state, { currentUser }) => ({
      ...state,
      isSubmitting: false,
      errors: null,
      currentUser
    })),
    on(authActions.registerFailure, (state, { errors }) => ({
      ...state,
      errors,
      isSubmitting: false
    }))
  )
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectErrors
} = authFeature;
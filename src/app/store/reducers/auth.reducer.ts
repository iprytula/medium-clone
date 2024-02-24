import { createFeature, createReducer, on } from "@ngrx/store";
import { BackendErrorsInterface } from "src/app/shared/types/backend-errors.interface";
import { CurrentUserInterface } from "src/app/shared/types/current-user.interface";
import { authActions } from "../actions/auth.actions";
import { routerNavigatedAction } from "@ngrx/router-store";

export interface AuthStateInterface {
  isSubmitting: boolean
  isLoading: boolean
  errors: BackendErrorsInterface | null
  currentUser: CurrentUserInterface | null
}

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
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
      currentUser
    })),
    on(authActions.registerFailure, (state, { errors }) => ({
      ...state,
      errors,
      isSubmitting: false
    })),
    on(authActions.login, state => ({ ...state, isSubmitting: true })),
    on(authActions.loginSuccess, (state, { currentUser }) => ({
      ...state,
      isSubmitting: false,
      currentUser
    })),
    on(authActions.loginFailure, (state, { errors }) => ({
      ...state,
      errors,
      isSubmitting: false
    })),
    on(authActions.getCurrentUser, state => ({ ...state, isLoading: true })),
    on(authActions.getCurrentUserSuccess, (state, { currentUser }) => ({
      ...state,
      isLoading: false,
      currentUser
    })),
    on(authActions.getCurrentUserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null
    })),
    on(routerNavigatedAction, (state) => ({ ...state, errors: null }))
  )
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectErrors
} = authFeature;
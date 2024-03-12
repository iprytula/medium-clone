import { createFeature, createReducer, on } from "@ngrx/store"
import { popularTagsActions } from "../actions/popular-tags.actions"
import { routerNavigationAction } from "@ngrx/router-store"


export interface PopularTagsStateInterface {
  popularTags: string[] | null,
  error: string | null,
  isLoading: boolean
};

const initialState: PopularTagsStateInterface = {
  popularTags: [],
  error: null,
  isLoading: false
}

const popularTagsFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initialState,
    on(popularTagsActions.getPopularTags, state => ({ ...state, isLoading: true })),
    on(popularTagsActions.getPopularTagsSuccess, (state, { tags }) => ({ ...state, popularTags: tags, isLoading: false })),
    on(popularTagsActions.getPopularTagsFailure, state => ({ ...state, isLoading: false })),
    on(routerNavigationAction, () => initialState)
  )
});


export const {
  name: popularTagsFeatureKey,
  reducer: popularTagsReducer,
  selectPopularTags,
  selectIsLoading,
  selectError
} = popularTagsFeature;
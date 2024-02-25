import { createFeature, createReducer, on } from "@ngrx/store";
import { GetFeedResponseInterface } from "src/app/shared/types/get-feed-response.interface";
import { feedActions } from "../actions/feed.actions";
import { routerNavigationAction } from "@ngrx/router-store";

export interface FeedStateInterface {
  feed: GetFeedResponseInterface | null,
  error: string | null,
  isLoading: boolean
};

const initialState: FeedStateInterface = {
  feed: null,
  error: null,
  isLoading: false
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedActions.getFeed, state => ({ ...state, isLoading: true })),
    on(feedActions.getFeedSuccess, (state, { feed }) => ({ ...state, isLoading: false, feed })),
    on(feedActions.getFeedFailure, state => ({ ...state, isLoading: false })),
    on(routerNavigationAction, () => initialState)
  )
});

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectFeed,
  selectIsLoading,
  selectError
} = feedFeature;
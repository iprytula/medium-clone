import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const popularTagsActions = createActionGroup({
  source: 'popularTags',
  events: {
    getPopularTags: emptyProps(),
    getPopularTagsSuccess: props<{ tags: string[] }>(),
    getPopularTagsFailure: emptyProps()
  }
});
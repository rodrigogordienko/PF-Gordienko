import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectIsLoading = createSelector(selectUserState, (state) => {
  return state.isLoading;
});

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUsersError = createSelector(
  selectUserState,
  (state) => state.error
);
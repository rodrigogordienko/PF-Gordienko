// inscriptions.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscription from './inscription.reducer';

export const selectInscriptionState = createFeatureSelector<fromInscription.State>(
  fromInscription.inscriptionsFeatureKey
);

export const selectIsLoading = createSelector(selectInscriptionState, (state) => state.isLoading);

export const selectAllInscriptions = createSelector(selectInscriptionState, (state) => state.inscriptions);

export const selectInscriptionsError = createSelector(selectInscriptionState, (state) => state.error);

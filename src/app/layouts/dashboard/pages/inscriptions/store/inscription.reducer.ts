// inscriptions.reducer.ts
import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { IInscription } from '../models';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  inscriptions: IInscription[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  inscriptions: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(InscriptionActions.loadInscriptions, state => ({
    ...state,
    isLoading: true,
  })),
  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    inscriptions: action.data,
  })),
  on(InscriptionActions.loadInscriptionsFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false,
  })),
  on(InscriptionActions.createInscription, state => ({
    ...state,
    isLoading: true,
  })),
  on(InscriptionActions.createInscriptionSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    inscriptions: [...state.inscriptions, action.data],
  })),
  on(InscriptionActions.createInscriptionFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(InscriptionActions.updateInscription, state => ({
    ...state,
    isLoading: true,
  })),
  on(InscriptionActions.updateInscriptionSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    inscriptions: state.inscriptions.map(inscription =>
      inscription.id === action.data.id ? action.data : inscription
    ),
  })),
  on(InscriptionActions.updateInscriptionFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(InscriptionActions.deleteInscriptionById, state => ({
    ...state,
    isLoading: true,
  })),
  on(InscriptionActions.deleteInscriptionByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    inscriptions: state.inscriptions.filter(el => el.id !== action.data.id),
  })),
  on(InscriptionActions.deleteInscriptionByIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

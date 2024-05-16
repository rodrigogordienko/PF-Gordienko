import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureName, AuthState } from './auth.reducer';
// Selectors: Los selectores son funciones puras que se utilizan para obtener partes del estado de la tienda.

// Para obtener el estado
export const authState = createFeatureSelector<AuthState>(authFeatureName);
// Para obtener el authUser del estado actual
export const authUser = createSelector(authState, (state) => state.authUser); // dado el estado retorna el usuario 
//asociado al estado
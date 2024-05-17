import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { IUser } from '../models';

export const userFeatureKey = 'user';

export interface State {
  users: IUser[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  users: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  // Acciones de cargar usuarios...
  on(UserActions.loadUsers, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(UserActions.loadUsersSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users: action.data,
  })),

  on(UserActions.loadUsersFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false,
  })),

  // Acciones de crear usuario...
  on(UserActions.createUser, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(UserActions.createUserSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users: [...state.users, action.data],
  })),

  on(UserActions.createUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  // Acciones de actualizar usuario...
  on(UserActions.updateUser, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(UserActions.updateUserSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users: state.users.map(user =>
      user.id === action.data.id ? action.data : user
    ),
  })),

  on(UserActions.updateUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  // Acciones de eliminar usuario...
  on(UserActions.deleteUserById, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(UserActions.deleteUserByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users: state.users.filter((el) => el.id !== action.data.id),
  })),

  on(UserActions.deleteUserByIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});
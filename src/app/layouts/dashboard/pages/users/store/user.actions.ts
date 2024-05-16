import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateUserPayload, IUser } from '../models';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: IUser[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),
    'Create User': props<{ payload: CreateUserPayload }>(),
    'Create User Success': props<{ data: IUser }>(),
    'Create User Failure': props<{ error: unknown }>(),
    'Update User': props<{ id: number; payload: CreateUserPayload }>(),
    'Update User Success': props<{ data: IUser }>(),
    'Update User Failure': props<{ error: unknown }>(),
    'Delete User By Id': props<{ id: number }>(),
    'Delete User By Id Success': props<{ data: { id: number } }>(),
    'Delete User By Id Failure': props<{ error: unknown }>(),
  }
});

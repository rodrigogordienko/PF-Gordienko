import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../users.service';
import { UserActions } from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() => 
        this.usersService.getUsers().pipe(
          map(data => UserActions.loadUsersSuccess({ data })),
          catchError(error => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap(action => 
        this.usersService.createUser(action.payload).pipe(
          map(data => UserActions.createUserSuccess({ data })),
          catchError(error => of(UserActions.createUserFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(action =>
        this.usersService.updateUser(action.id, action.payload).pipe(
          map(data => UserActions.updateUserSuccess({ data })),
          catchError(error => of(UserActions.updateUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUserById),
      mergeMap(action =>
        this.usersService.deleteUserById(action.id).pipe(
          map(() => UserActions.deleteUserByIdSuccess({ data: { id: action.id } })),
          catchError(error => of(UserActions.deleteUserByIdFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {}
}

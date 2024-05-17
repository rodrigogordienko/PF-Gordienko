// inscriptions.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { InscriptionsService } from '../inscriptions.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class InscriptionEffects {
  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadInscriptions),
      concatMap(() =>
        this.inscriptionsService.getInscriptions().pipe(
          map(data => InscriptionActions.loadInscriptionsSuccess({ data })),
          catchError(error =>
            of(InscriptionActions.loadInscriptionsFailure({ error }))
          )
        )
      )
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.createInscription),
      concatMap(action =>
        this.inscriptionsService.createInscription(action.payload).pipe(
          map(data => InscriptionActions.createInscriptionSuccess({ data })),
          catchError(error =>
            of(InscriptionActions.createInscriptionFailure({ error }))
          )
        )
      )
    );
  });

  updateInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.updateInscription),
      concatMap(action =>
        this.inscriptionsService.updateInscription(action.id, action.payload).pipe(
          map(data => InscriptionActions.updateInscriptionSuccess({ data })),
          catchError(error =>
            of(InscriptionActions.updateInscriptionFailure({ error }))
          )
        )
      )
    );
  });

  deleteInscriptionById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.deleteInscriptionById),
      concatMap(action =>
        this.inscriptionsService.deleteInscriptionById(action.id).pipe(
          map(data => InscriptionActions.deleteInscriptionByIdSuccess({ data })),
          catchError(error =>
            of(InscriptionActions.deleteInscriptionByIdFailure({ error }))
          )
        )
      )
    );
  });

  onErrors$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          InscriptionActions.loadInscriptionsFailure,
          InscriptionActions.createInscriptionFailure,
          InscriptionActions.deleteInscriptionByIdFailure
        ),
        tap(action => {
          if (action.error instanceof HttpErrorResponse) {
            Swal.fire({
              icon: 'error',
              text: action.error.message,
            });
          }
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private inscriptionsService: InscriptionsService
  ) {}
}

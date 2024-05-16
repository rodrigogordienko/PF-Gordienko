// inscriptions.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateInscriptionPayload, IInscription } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: IInscription[] }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),

    'Create Inscription': props<{ payload: CreateInscriptionPayload }>(),
    'Create Inscription Success': props<{ data: IInscription }>(),
    'Create Inscription Failure': props<{ error: unknown }>(),

    'Update Inscription': props<{ id: number, payload: CreateInscriptionPayload }>(),
    'Update Inscription Success': props<{ data: IInscription }>(),
    'Update Inscription Failure': props<{ error: unknown }>(),

    'Delete Inscription By Id': props<{ id: number }>(),
    'Delete Inscription By Id Success': props<{ data: IInscription }>(),
    'Delete Inscription By Id Failure': props<{ error: HttpErrorResponse }>(),
  },
});
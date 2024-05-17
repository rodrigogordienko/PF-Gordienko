import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IStudent, CreateStudentPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: IStudent[] }>(),
    'Load Students Failure': props<{ error: unknown }>(),

    'Create Student': props<{ payload: CreateStudentPayload }>(),
    'Create Student Success': props<{ data: IStudent }>(),
    'Create Student Failure': props<{ error: unknown }>(),

    'Update Student': props<{ id: number, payload: CreateStudentPayload }>(),
    'Update Student Success': props<{ data: IStudent }>(),
    'Update Student Failure': props<{ error: unknown }>(),

    'Delete Student By Id': props<{ id: number }>(),
    'Delete Student By Id Success': props<{ data: IStudent }>(),
    'Delete Student By Id Failure': props<{ error: HttpErrorResponse }>(),
  },
});
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { StudentActions } from './student.actions';
import { StudentsService } from '../students.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StudentEffects {
  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      concatMap(() =>
        this.studentsService.getStudents().pipe(
          // El servicio responde OK:
          map((data) => StudentActions.loadStudentsSuccess({ data })),
          // El servicio responde FAIL:
          catchError((error) =>
            of(StudentActions.loadStudentsFailure({ error }))
          )
        )
      )
    );
  });

  createStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.createStudent),
      concatMap((action) =>
        this.studentsService.createStudent(action.payload).pipe(
          // El servicio responde OK:
          map((data) => StudentActions.createStudentSuccess({ data })),
          // El servicio responde FAIL:
          catchError((error) =>
            of(StudentActions.createStudentFailure({ error }))
          )
        )
      )
    );
  });

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.updateStudent),
      concatMap((action) =>
        this.studentsService.updateStudent(action.id, action.payload).pipe(
          // El servicio responde OK:
          map((data) => StudentActions.updateStudentSuccess({ data })),
          // El servicio responde FAIL:
          catchError((error) =>
            of(StudentActions.updateStudentFailure({ error }))
          )
        )
      )
    );
  });

  deleteStudentById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.deleteStudentById),
      concatMap((action) =>
        this.studentsService.deleteStudentById(action.id).pipe(
          // El servicio responde OK:
          map((data) => StudentActions.deleteStudentByIdSuccess({ data })),
          // El servicio responde FAIL:
          catchError((error) =>
            of(StudentActions.deleteStudentByIdFailure({ error }))
          )
        )
      )
    );
  });

  onErrors$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
            StudentActions.loadStudentsFailure,
            StudentActions.createStudentFailure,
            StudentActions.updateStudentFailure,
            StudentActions.deleteStudentByIdFailure
        ),
        tap((action) => {
          if (action.error instanceof HttpErrorResponse) {
            Swal.fire({
              icon: 'error',
              text: action.error['message'],
            });
          }
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private studentsService: StudentsService
  ) {}
}

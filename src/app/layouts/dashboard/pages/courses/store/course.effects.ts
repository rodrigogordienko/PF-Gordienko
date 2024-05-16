import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CourseActions } from './course.actions';
import { CoursesService } from '../courses.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CourseEffects {
    
  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.coursesService.getCourses().pipe(
          // El servicio responde OK:
          map((data) => CourseActions.loadCoursesSuccess({ data })),

          // El servicio responde FAIL:
          catchError((error) =>
            of(CourseActions.loadCoursesFailure({ error }))
          )
        )
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      // Filtramos la accion:
      ofType(CourseActions.createCourse),
      concatMap((action) =>
        this.coursesService.createCourse(action.payload).pipe(
          // El servicio responde OK:
          map((data) => CourseActions.createCourseSuccess({ data })),
          // El servicio responde FAIL:
          catchError((error) =>
            of(CourseActions.createCourseFailure({ error }))
          )
        )
      )
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.updateCourse),
      concatMap((action) =>
        this.coursesService.updateCourse(action.id, action.payload).pipe(
          map((data) => CourseActions.updateCourseSuccess({ data })),
          catchError((error) => of(CourseActions.updateCourseFailure({ error })))
        )
      )
    );
  });

  deleteCourseById$ = createEffect(() => {
    return this.actions$.pipe(
      // Filtramos la accion:
      ofType(CourseActions.deleteCourseById),
      concatMap((action) =>
        this.coursesService.deleteCourseById(+action.id).pipe(
          // El servicio responde OK:
          map((data) => CourseActions.deleteCourseByIdSuccess({ data })),
          // El servicio responde FAIL:
          catchError((error) =>
            of(CourseActions.deleteCourseByIdFailure({ error }))
          )
        )
      )
    );
  });

  onErrors$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
            CourseActions.loadCoursesFailure,
            CourseActions.createCourseFailure,
            CourseActions.deleteCourseByIdFailure
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
    private coursesService: CoursesService
  ) {}
}
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateCoursePayload, ICourse } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: ICourse[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),

    'Create Course': props<{ payload: CreateCoursePayload }>(),
    'Create Course Success': props<{ data: ICourse }>(),
    'Create Course Failure': props<{ error: unknown }>(),

    'Update Course': props<{ id: number, payload: CreateCoursePayload }>(),
    'Update Course Success': props<{ data: ICourse }>(),
    'Update Course Failure': props<{ error: unknown }>(),

    'Delete Course By Id': props<{ id: number }>(),
    'Delete Course By Id Success': props<{ data: ICourse }>(),
    'Delete Course By Id Failure': props<{ error: HttpErrorResponse }>(),
  },
});
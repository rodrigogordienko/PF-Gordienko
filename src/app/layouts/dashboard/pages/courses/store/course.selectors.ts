import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from './course.reducer';

export const selectCourseState = createFeatureSelector<fromCourse.State>(
  fromCourse.courseFeatureKey
);

export const selectIsLoading = createSelector(selectCourseState, (state) => {
  return state.isLoading;
});

export const selectCourses = createSelector(
  selectCourseState,
  (state) => state.courses
);

export const selectCoursesError = createSelector(
  selectCourseState,
  (state) => state.error
);
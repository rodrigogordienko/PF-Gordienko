import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './student.reducer';

export const selectStudentState = createFeatureSelector<fromStudent.State>(
  fromStudent.studentFeatureKey
);

export const selectIsLoading = createSelector(selectStudentState, (state) => {
  return state.isLoading;
});

export const selectStudents = createSelector(
  selectStudentState,
  (state) => state.students
);

export const selectStudentsError = createSelector(
  selectStudentState,
  (state) => state.error
);
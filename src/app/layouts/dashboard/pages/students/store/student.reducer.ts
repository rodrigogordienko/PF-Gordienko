import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentActions } from './student.actions';
import { IStudent } from '../models';

export const studentFeatureKey = 'student';

export interface State {
  students: IStudent[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  students: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  // Acción cargar estudiantes...
  on(StudentActions.loadStudents, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  // Los estudiantes se cargaron sin errores...
  on(StudentActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      students: action.data,
    };
  }),

  // Los estudiantes se cargaron con algún error
  on(StudentActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),

  // Acciones de creación de estudiante...
  on(StudentActions.createStudent, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(StudentActions.createStudentSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      students: [...state.students, action.data],
    };
  }),

  on(StudentActions.createStudentFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  // Acciones de actualización de estudiante...
  on(StudentActions.updateStudent, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(StudentActions.updateStudentSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      students: state.students.map(student =>
        student.id === action.data.id ? action.data : student
      ),
    };
  }),

  on(StudentActions.updateStudentFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  // Acciones de eliminación de estudiante...
  on(StudentActions.deleteStudentById, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(StudentActions.deleteStudentByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    students: state.students.filter((el) => el.id !== action.data.id),
  })),

  on(StudentActions.deleteStudentByIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);

export const studentFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});

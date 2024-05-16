import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../layouts/dashboard/pages/users/models';
import { authActions } from './auth.actions';

// Reducers: Los Reducers son los encargados de manejar las transiciones de estado y determinan
// las acciones que manejan según su tipo.
// La responsabilidad de la función reductora es manejar las transacciones de estado de manera inmutable

// State: Es un contenedor de estado controlado para ayudar a escribir aplicaciones consistentes.

export interface AuthState {
  authUser: null | IUser;
}

const initialState: AuthState = {
  authUser: null,
};

const MOCK_AUTH_USER_ADMIN: IUser = {
    id: 1,
    createdAt: new Date(),
    email: 'adminmail@mail.com',
    firstname: 'soyadmin',
    secondname: 'apellido',
    role: 'ADMIN',
  };

const MOCK_AUTH_USER_TEACHER: IUser = {
      id: 2,
      createdAt: new Date(),
      email: 'sofia@mail.com',
      firstname: 'Sofía',
      secondname: 'L',
      role: 'TEACHER',
  };

export const authFeatureName = 'auth';

export const authReducer = createReducer(
  initialState,
  on(authActions.login, (state, action) => {
    if ((action.payload.email === 'admin@mail.com' && action.payload.password === 'admin') ) {
        localStorage.setItem(
            'accessToken',
            'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfda'
          );
        return {
            authUser: MOCK_AUTH_USER_ADMIN
        }
        //this.router.navigate(['dashboard', 'home']);
      } else if (action.payload.email === 'teacher@mail.com' && action.payload.password === 'teacher'){
        //this._authUser$.next(this.MOCK_AUTH_USER_TEACHER);
        localStorage.setItem(
          'accessToken',
          'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfdt'
        );
        return {
            authUser: MOCK_AUTH_USER_TEACHER
        }
        //this.router.navigate(['dashboard', 'home']);
      }else {
        alert('Correo o password incorrectos');
        return state;
      }
  }),

  on(authActions.logout, () => {
    localStorage.removeItem('accessToken');
    return initialState;
  })
);
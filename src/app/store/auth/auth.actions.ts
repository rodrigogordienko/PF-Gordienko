import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginData } from '../../layouts/auth/models';

// Las acciones son las entradas/salidas, eventos únicos que transcurren durante la ejecución de la aplicación

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ payload: LoginData }>(),
    logout: emptyProps(),       // No necesitamos recibir informacion
  },
});
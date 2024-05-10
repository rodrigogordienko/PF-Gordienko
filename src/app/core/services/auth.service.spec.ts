import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';

describe('AuthService', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, MockProvider(Router)],
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('Debe establecer un usuario administrador autenticado al llamar login', () => {
    const spyOnSetItem = spyOn(localStorage, 'setItem');
    const spyOnNavigate = spyOn(router, 'navigate');
    authService.login({
      email: 'admin@mail.com',
      password: 'admin',
    });
    authService.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeTruthy(); // no tiene que ser null, undefined o false
        expect(spyOnSetItem).toHaveBeenCalled();
        expect(spyOnNavigate).toHaveBeenCalled();
      },
    });
  });

  it('Debe establecer un usuario profesor autenticado al llamar login', () => {
    const spyOnSetItem = spyOn(localStorage, 'setItem');
    const spyOnNavigate = spyOn(router, 'navigate');
    authService.login({
      email: 'teacher@mail.com',
      password: 'teacher',
    });
    authService.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeTruthy(); // no tiene que ser null, undefined o false
        expect(spyOnSetItem).toHaveBeenCalled();
        expect(spyOnNavigate).toHaveBeenCalled();
      },
    });
  });

  it('Debe mostrar un alert con el texto "Correo o password incorrectos" si los datos no coinciden en el login', () => {
    const spyOnAlert = spyOn(window, 'alert');
    authService.login({
      email: 'fake@mail.com',
      password: 'abcde123',
    });
    expect(spyOnAlert).toHaveBeenCalledWith('Correo o password incorrectos');
  });

  it('Debe retornar true si el token es válido y establecer el usuario admin', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfda');
    const result = authService.verifyToken();
    expect(result).toBeTrue();
    authService.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toEqual(authService['MOCK_AUTH_USER_ADMIN']);
      },
    });
  });

  it('Debe retornar true si el token es válido y establecer el usuario teacher', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfdt');
    const result = authService.verifyToken();
    expect(result).toBeTrue();
    authService.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toEqual(authService['MOCK_AUTH_USER_TEACHER']);
      },
    });
  });

  it('Debe retornar false si el token no es válido', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token_invalido');
    const result = authService.verifyToken();
    expect(result).toBeFalse();
  });

  it('Debe limpiar el usuario y el token al llamar a logout', () => {
    const spyOnRemoveItem = spyOn(localStorage, 'removeItem');
    authService.logout();
    authService.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeNull();
        expect(spyOnRemoveItem).toHaveBeenCalledWith('accessToken');
      },
    });
  });

});
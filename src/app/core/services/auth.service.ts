import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IStudent } from '../../layouts/dashboard/pages/students/models';
import { IUser } from '../../layouts/dashboard/pages/users/models';
import { Router } from '@angular/router';
import { LoginData } from '../../layouts/auth/models';
import { localStorageSync } from 'ngrx-store-localstorage';
import { localStorageSyncReducer } from '../../store';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private MOCK_AUTH_USER_ADMIN: IUser = {
    id: 1,
    createdAt: new Date(),
    email: 'adminmail@mail.com',
    firstname: 'soyadmin',
    secondname: 'apellido',
    role: 'ADMIN',
    phone: 123421421,
    address: "Plaza Principal 421"
  };

  private MOCK_AUTH_USER_TEACHER: IUser = {
      id: 2,
      createdAt: new Date(),
      email: 'sofia@mail.com',
      firstname: 'Sofía',
      secondname: 'L',
      role: 'TEACHER',
      phone: 123123123,
      address: "Plaza Principal 123"
  };

  private _authUser$ = new BehaviorSubject<IUser | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) {}

  login(data: LoginData): void {
    if ((data.email === 'admin@mail.com' && data.password === 'admin') ) {
      //alert('Correo o password incorrectos');
      this._authUser$.next(this.MOCK_AUTH_USER_ADMIN);
      localStorage.setItem(
        'accessToken',
        'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfda'
      );
      this.router.navigate(['dashboard', 'home']);
    } else if (data.email === 'teacher@mail.com' && data.password === 'teacher'){
      //alert('Correo o password incorrectos');
      this._authUser$.next(this.MOCK_AUTH_USER_TEACHER);
      localStorage.setItem(
        'accessToken',
        'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfdt'
      );
      this.router.navigate(['dashboard', 'home']);
    }else {
      alert('Correo o password incorrectos');
    }
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token && token === 'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfda') {
      this._authUser$.next(this.MOCK_AUTH_USER_ADMIN);
      return true;
    } else if (token && token === 'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfdt') {
      this._authUser$.next(this.MOCK_AUTH_USER_TEACHER);
      return true;
    }else {
      return false;
    }
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('auth');
  }

  /*
  private _authUser$ = new BehaviorSubject<IStudent | null>(null);
  public authUser$ = this._authUser$.asObservable();
  
  login(): void {
    this._authUser$.next({
      id: 1,
      createdAt: new Date(),
      email: 'lionel@gmail.com',
      firstname: 'Lionel',
      secondname: 'Messi',
      course: 'Angular',
    });
  }

  logout(): void {
    this._authUser$.next(null);
  }
  */
}
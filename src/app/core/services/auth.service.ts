import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IStudent } from '../../layouts/dashboard/pages/students/models';
import { IUser } from '../../layouts/dashboard/pages/users/models';
import { Router } from '@angular/router';
import { LoginData } from '../../layouts/auth/models';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private MOCK_AUTH_USER: IUser = {
    id: 1,
    createdAt: new Date(),
    email: 'adminmail@mail.com',
    firstname: 'soyadmin',
    secondname: 'apellido',
    role: 'ADMIN',
  };

  private _authUser$ = new BehaviorSubject<IUser | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) {}

  login(data: LoginData): void {
    if (data.email !== 'admin@mail.com' || data.password !== 'admin') {
      alert('Correo o password incorrectos');
    } else {
      this._authUser$.next(this.MOCK_AUTH_USER);
      localStorage.setItem(
        'accessToken',
        'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfds'
      );
      this.router.navigate(['dashboard', 'students']);
    }
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this._authUser$.next(this.MOCK_AUTH_USER);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('accessToken');
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
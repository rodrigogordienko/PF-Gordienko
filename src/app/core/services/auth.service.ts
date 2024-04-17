import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IStudent } from '../../layouts/dashboard/pages/students/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
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
}
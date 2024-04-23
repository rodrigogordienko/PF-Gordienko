import { Injectable } from '@angular/core';
import { IStudent } from './models';
import { catchError, delay, first, Observable, of, throwError } from 'rxjs';

const USERS_DB: IStudent[] = [
  { id: 1 , firstname: "Cristiano" , secondname: "Ronaldo", email: "cristiano@gmail.com" , createdAt: new Date(), course: "Angular"},
  { id: 2 , firstname: "Lionel" , secondname: "Messi", email: "messi@gmail.com" , createdAt: new Date(), course: "React Js"},
  { id: 3 , firstname: "Luis" , secondname: "Suarez", email: "suarez@gmail.com" , createdAt: new Date(), course: "Python"},
  { id: 4 , firstname: "Toni" , secondname: "Kroos", email: "kroos@gmail.com" , createdAt: new Date(), course: "Java"},
  { id: 5 , firstname: "Karim" , secondname: "Benzema", email: "benzema@gmail.com" , createdAt: new Date(), course: "React Js"},
  { id: 6 , firstname: "Luka" , secondname: "Modric", email: "modric@gmail.com" , createdAt: new Date(), course: "Base de Datos"},
  { id: 7 , firstname: "Federico" , secondname: "Valverde", email: "valverde@gmail.com" , createdAt: new Date(), course: "Python"},
  { id: 8 , firstname: "Vinicius" , secondname: "Jr", email: "vinicius@gmail.com" , createdAt: new Date(), course: "Angular"},
];

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  getUsers(): Observable<IStudent[]> {
    return of(USERS_DB).pipe(delay(1500));
    // return throwError(() => new Error('Error al cargar los usuarios')).pipe(
    //   catchError((err) => of(err))
    // );
  }

  getStudentById(id: number): Observable<IStudent | undefined> {
    return of(USERS_DB.find((el) => el.id === id)).pipe(delay(1500));
  }
}

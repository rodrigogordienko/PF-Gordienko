import { Injectable } from '@angular/core';
import { CreateStudentPayload, IStudent } from './models';
import { catchError, delay, first, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

/*
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
*/

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<IStudent[]> {
    //return of(USERS_DB).pipe(delay(1500));
    return this.httpClient.get<IStudent[]>(environment.baseAPIURL + '/students');
    // return throwError(() => new Error('Error al cargar los usuarios')).pipe(
    //   catchError((err) => of(err))
    // );
  }

  getStudentById(id: number): Observable<IStudent | undefined> {
    //return of(USERS_DB.find((el) => el.id === id)).pipe(delay(1500));
    return this.httpClient.get<IStudent>(`${environment.baseAPIURL}/students/${id}`);
  }

  createUser(payload: CreateStudentPayload): Observable<IStudent> {
    console.log('en create user');
    console.log(payload)
    return this.httpClient.post<IStudent>(
      `${environment.baseAPIURL}/students`,
      payload
    );
  }

  deleteStudent(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseAPIURL}/students/${id}`);
  }

  updateStudent(id: number, payload:  CreateStudentPayload): Observable<IStudent> {
    return this.httpClient.put<IStudent>(
      `${environment.baseAPIURL}/students/${id}`,
      payload
    );
  }
}

import { Injectable } from '@angular/core';
import { CreateClassPayload, IClass } from './models';
import { catchError, delay, first, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
/*
const hora1 = new Date();
hora1.setHours(20);
hora1.setMinutes(30);

const hora2 = new Date();
hora2.setHours(19);
hora2.setMinutes(0);

const hora3 = new Date();
hora3.setHours(8);
hora3.setMinutes(30);

const hora4 = new Date();
hora4.setHours(12);
hora4.setMinutes(0);

const CLASSES_DB: IClass[] = [
  { id: 1 , teacher: "Josué" , course: "Angular",  hour: hora1},
  { id: 2 , teacher: "Sofía" , course: "React Js",  hour: hora2},
  { id: 3 , teacher: "Josué" , course: "Python",  hour: hora3},
  { id: 4 , teacher: "Sofía" , course: "Java",  hour: hora4},
  { id: 5 , teacher: "Josué" , course: "Base de Datos",  hour: hora2},
  { id: 6 , teacher: "Sofía" , course: "Angular",  hour: hora1},

];
*/

@Injectable({
  providedIn: 'root'
})
export class OnlineClassesService {

  constructor(private httpClient: HttpClient) {}

  getClasses(): Observable<IClass[]> {
    return this.httpClient.get<IClass[]>(environment.baseAPIURL + '/classes');
  }

  getClassById(id: string): Observable<IClass | undefined> {
    return this.httpClient.get<IClass>(`${environment.baseAPIURL}/classes/${id}`);
  }

  createClass(payload: CreateClassPayload): Observable<IClass> {
    return this.httpClient.post<IClass>(
      `${environment.baseAPIURL}/classes`,
      payload
    );
  }
  /*
  getClasses(): Observable<IClass[]> {
    return of(CLASSES_DB).pipe(delay(1500));
    // return throwError(() => new Error('Error al cargar los usuarios')).pipe(
    //   catchError((err) => of(err))
    // );
  }

  getClassById(id: number): Observable<IClass | undefined> {
    return of(CLASSES_DB.find((el) => el.id === id)).pipe(delay(1500));
  }
  */
}

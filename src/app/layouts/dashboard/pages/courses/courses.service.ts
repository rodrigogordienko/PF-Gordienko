import { Injectable } from '@angular/core';
import { ICourse } from './models';
import { catchError, delay, first, Observable, of, throwError } from 'rxjs';

let fecha1 = new Date();
fecha1.setDate(4);
fecha1.setMonth(3);
fecha1.setFullYear(2024);

let fecha2 = new Date();
fecha2.setDate(18);
fecha2.setMonth(3);
fecha2.setFullYear(2024);

let fecha3 = new Date();
fecha3.setDate(16);
fecha3.setMonth(4);
fecha3.setFullYear(2024);

let fecha4 = new Date();
fecha4.setDate(17);
fecha4.setMonth(6);
fecha4.setFullYear(2024);

const COURSES_DB: ICourse[] = [
  { id: 1 , teacher: "Josué" , name: "Angular",  startDate: fecha1},
  { id: 2 , teacher: "Sofía" , name: "React Js",  startDate: fecha2},
  { id: 3 , teacher: "Josué" , name: "Python",  startDate: fecha3},
  { id: 4 , teacher: "Sofía" , name: "Java",  startDate: fecha4},
  { id: 5 , teacher: "Josué" , name: "Base de Datos",  startDate: fecha2},

];

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  getCourses(): Observable<ICourse[]> {
    return of(COURSES_DB).pipe(delay(1500));
    // return throwError(() => new Error('Error al cargar los usuarios')).pipe(
    //   catchError((err) => of(err))
    // );
  }

  getCourseById(id: number): Observable<ICourse | undefined> {
    return of(COURSES_DB.find((el) => el.id === id)).pipe(delay(1500));
  }
}

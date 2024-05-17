import { Injectable } from '@angular/core';
import { CreateCoursePayload, ICourse } from './models';
import { catchError, delay, first, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) {}

  getCourses(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(environment.baseAPIURL + '/courses');
  }

  getCourseById(id: number): Observable<ICourse | undefined> {
    return this.httpClient.get<ICourse>(`${environment.baseAPIURL}/courses/${id}`);
  }

  createCourse(payload: CreateCoursePayload): Observable<ICourse> {
    return this.httpClient.post<ICourse>(
      `${environment.baseAPIURL}/courses`,
      payload
    );
  }

  updateCourse(id: number, payload: CreateCoursePayload): Observable<ICourse> {
    return this.httpClient.put<ICourse>(`${environment.baseAPIURL}/courses/${id}`, payload);
  }

  deleteCourseById(id: number):  Observable<ICourse> {
    return this.httpClient.delete<ICourse>(`${environment.baseAPIURL}/courses/${id}`);
  }
}

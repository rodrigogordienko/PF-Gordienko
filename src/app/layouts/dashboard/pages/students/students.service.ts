import { Injectable } from '@angular/core';
import { CreateStudentPayload, IStudent } from './models';
import { catchError, delay, first, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) {}

  getStudents(): Observable<IStudent[]> {
    return this.httpClient.get<IStudent[]>(environment.baseAPIURL + '/students');
  }

  getStudentById(id: number): Observable<IStudent | undefined> {
    return this.httpClient.get<IStudent>(`${environment.baseAPIURL}/students/${id}`);
  }

  createStudent(payload: CreateStudentPayload): Observable<IStudent> {
    return this.httpClient.post<IStudent>(
      `${environment.baseAPIURL}/students`,
      payload
    );
  }

  deleteStudentById(id: number): Observable<IStudent> {
    return this.httpClient.delete<IStudent>(`${environment.baseAPIURL}/students/${id}`);
  }

  updateStudent(id: number, payload:  CreateStudentPayload): Observable<IStudent> {
    return this.httpClient.put<IStudent>(
      `${environment.baseAPIURL}/students/${id}`,
      payload
    );
  }
}
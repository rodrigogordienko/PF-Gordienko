import { Injectable } from '@angular/core';
import { CreateInscriptionPayload, IInscription } from './models';
import { catchError, delay, first, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  constructor(private httpClient: HttpClient) {}

  getInscriptions(): Observable<IInscription[]> {
    return this.httpClient.get<IInscription[]>(environment.baseAPIURL + '/inscriptions');
  }

  getIinscriptionById(id: string): Observable<IInscription | undefined> {
    return this.httpClient.get<IInscription>(`${environment.baseAPIURL}/inscriptions/${id}`); 
  }

  createInscription(payload: CreateInscriptionPayload): Observable<IInscription> {
    return this.httpClient.post<IInscription>(
      `${environment.baseAPIURL}/inscriptions`,
      payload
    );
  }

  deleteInscription(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseAPIURL}/inscriptions/${id}`);
  }

  updateInscription(id: number, payload: CreateInscriptionPayload): Observable<IInscription> {
    return this.httpClient.put<IInscription>(
      `${environment.baseAPIURL}/inscriptions/${id}`,
      payload
    );
  }

}

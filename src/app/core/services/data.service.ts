import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // courses lo usaremos como Promise
  private courses = ['Angular', 'React'];
  // numbers lo usaremos como Observable para aplicarle el filto map
  private numbers = [0, 1, 2, 3];

  constructor() { }

  getCourses(): Promise<string[]> {
    // Simulamos una operación asíncrona
    return new Promise<string[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.courses);
      }, 5000); // Simulamos una demora de 5 segundos
    });
  }

  getNumbers(): Observable<number[]> {
    return of(this.numbers);
  }
}

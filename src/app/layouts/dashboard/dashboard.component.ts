import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { IStudent } from './pages/students/models';
import { DataService } from '../../core/services/data.service';
import { IUser } from './pages/users/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  showFiller = false;

  authUser$: Observable<IUser | null>;

  authUserSinPipe: IUser | null = null;
  authUserSubscription?: Subscription;

  courses: string[];          // Para promise
  doubledNumbers: number[];   // Observable para map filter

  constructor(private authService: AuthService, private dataService: DataService, private router: Router) {
    this.authUser$ = this.authService.authUser$;  //damos valor inicial null
    this.courses = [];
    this.doubledNumbers = []
  }

  ngOnDestroy(): void {
    this.authUserSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.authUserSubscription = this.authService.authUser$.subscribe({
      next: (user) => {
        this.authUserSinPipe = user;
      },
    });

    // Para usar promesa asincrona de 1 segundo
    this.dataService.getCourses()
      .then(courses => {
        this.courses = courses;
      })
      .catch(error => {
        console.error('Error al obtener los cursos:', error);
      });

      //Para aplicar el filto map
      this.dataService.getNumbers()
      .pipe(
        map(numbers => numbers.map(number => number + 1))
      )
      .subscribe(doubledNumbers => {
        this.doubledNumbers = doubledNumbers;
      });
  
  
  }
  /*
  login(): void {
    this.authService.login();
  }
  */

  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

  isMobile(): boolean {
    return window.innerWidth <= 280;
  }
}

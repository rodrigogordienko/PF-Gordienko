// inscriptions.component.ts
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { IInscription } from './models';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionsDialogComponent } from './components/inscriptions-dialog/inscriptions-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../users/models';
import { StudentsService } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';
import { UsersService } from '../users/users.service';
import { ICourse } from '../courses/models';
import { IStudent } from '../students/models';
import { Store } from '@ngrx/store';
import { InscriptionActions } from './store/inscription.actions';
import { selectAllInscriptions, selectIsLoading, selectInscriptionsError } from './store/inscription.selectors';
import { authUser } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent implements OnInit, OnDestroy {

  loading$: Observable<boolean>;
  inscriptions$: Observable<IInscription[]>;
  error$: Observable<any>;
  courses: ICourse[] = [];
  students: IStudent[] = [];
  users: IUser[] = [];
  authUser$: Observable<IUser | null>;
  authUserSubscription?: Subscription;
  counter = 0;

  authUserSinPipe: IUser | null = null;

  displayedColumns: string[] = [
    'id',
    'student',
    'course',
    'hour',
    'user',
    'actions',
  ];

  constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private usersService: UsersService,
    private store: Store
  ) {
    this.loading$ = this.store.select(selectIsLoading);
    this.inscriptions$ = this.store.select(selectAllInscriptions);
    this.error$ = this.store.select(selectInscriptionsError);
    //this.authUser$ = this.authService.authUser$;
    this.authUser$ = this.store.select(authUser)
    console.log(this.authUser$)
  }

  ngOnInit(): void {
    
    this.authUserSubscription = this.authUser$.subscribe(user => {
      this.authUserSinPipe = user;
      
    });
    

    this.store.dispatch(InscriptionActions.loadInscriptions());
    this.loadCourses();
    this.loadStudents();
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.authUserSubscription?.unsubscribe();
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: courses => {
        this.courses = courses;
      },
    });
  }

  loadStudents() {
    this.studentsService.getStudents().subscribe({
      next: students => {
        this.students = students;
      },
    });
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: users => {
        this.users = users;
      },
    });
  }

  getUserName(userId: number): string {
    const user = this.users.find(user => user.id === userId);
    return user ? user.firstname : '';
  }

  getStudentName(studentId: number): string {
    const student = this.students.find(student => student.id === studentId);
    return student ? student.firstname : '';
  }

  getStudentSecondName(studentId: number): string {
    const student = this.students.find(student => student.id === studentId);
    return student ? student.secondname : '';
  }

  getCourseName(courseId: number): string {
    const course = this.courses.find(course => course.id === courseId);
    return course ? course.name : '';
  }

  openDialog(editingInscription?: IInscription): void {
    this.inscriptions$.subscribe(inscriptions => {
      let maxId = inscriptions.length > 0 ? Math.max(...inscriptions.map(inscription => Number(inscription.id))) : 0;
    this.matDialog
      .open(InscriptionsDialogComponent, {
        data: editingInscription,
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          if (editingInscription) {
            result.hour = editingInscription.hour;
            result.user = editingInscription.user;
            this.store.dispatch(InscriptionActions.updateInscription({ id: editingInscription.id, payload: result }));
          } else {
            //this.counter++;
            //result.id = this.counter;
            result.id = (maxId + 1).toString();
            result.user = this.authUserSinPipe?.id.toString();
            console.log('el result user es: ', this.authUserSinPipe?.id )
            result.hour = new Date();
            this.store.dispatch(InscriptionActions.createInscription({ payload: result }));
          }
        }
      });
    }).unsubscribe();
  }

  onDeleteInscription(id: number): void {
    if (confirm('¿Está seguro?')) {
      this.store.dispatch(InscriptionActions.deleteInscriptionById({ id }));
    }
  }
}

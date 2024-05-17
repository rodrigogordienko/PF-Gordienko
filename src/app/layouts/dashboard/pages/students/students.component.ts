import { Component, ViewChild, OnInit } from '@angular/core';
import { IStudent } from './models';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { StudentsService } from './students.service';
import { Store } from '@ngrx/store';
import { StudentActions } from './store/student.actions';
import {
  selectIsLoading,
  selectStudents,
  selectStudentsError,
} from './store/student.selectors';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { IUser } from '../users/models';
import { authUser } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  counter = 0;
  students$: Observable<IStudent[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<Error>;

  authUser$: Observable<IUser | null>;

  displayedColumns: string[] = [
    'id',
    'fullname',
    'email',
    'address',
    'phone',
    'createdAt',
    'actions',
  ];

  constructor(private matDialog: MatDialog, private studentsService: StudentsService, private store: Store) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.students$ = this.store.select(selectStudents);
    this.error$ = this.store
      .select(selectStudentsError)
      .pipe(map((err) => err as Error));
    this.counter = 1000;
    this.authUser$ = this.store.select(authUser);
  }

  ngOnInit(): void {
    this.store.dispatch(StudentActions.loadStudents());
  }

  openDialog(editingStudent?: IStudent): void {
    this.students$.subscribe(students => {
      let maxId = students.length > 0 ? Math.max(...students.map(student => Number(student.id))) : 0;
    this.matDialog
      .open(UserDialogComponent, {
        data: editingStudent,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingStudent) {
              result.createdAt = editingStudent.createdAt;
              this.store.dispatch(StudentActions.updateStudent({ id: editingStudent.id, payload: result }));
            } else {
              result.createdAt = new Date();
              result.id = (maxId + 1).toString();
              this.store.dispatch(StudentActions.createStudent({ payload: result }));
            }
          }
        },
      });
    }).unsubscribe();
  }

  deleteStudentById(id: number): void {
    Swal.fire({
      icon: 'question',
      html: `¿Está seguro?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(StudentActions.deleteStudentById({ id }));
      }
    });
  }
}
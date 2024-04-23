import { Component } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { IStudent } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {

  user$: Observable<IStudent | undefined>;

  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studentsSerivice: StudentsService
  ) {
    this.loading = true;
    this.user$ = this.studentsSerivice
      .getStudentById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      );
  }

}

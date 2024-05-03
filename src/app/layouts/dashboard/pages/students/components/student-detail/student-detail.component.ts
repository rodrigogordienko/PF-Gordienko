import { Component } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { IStudent } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../students.service';
import { CoursesService } from '../../../courses/courses.service';
import { ICourse } from '../../../courses/models';
import { IInscription } from '../../../inscriptions/models';
import { InscriptionsService } from '../../../inscriptions/inscriptions.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {

  user$: Observable<IStudent | undefined>;
  courses: ICourse[] = [];
  inscriptions: IInscription[] = [];

  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studentsSerivice: StudentsService,
    private coursesService: CoursesService,
    private inscriptionsService: InscriptionsService
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

  loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });
  }

  loadInscriptions() {
    this.user$.subscribe(user => {
      if (user) {
        this.inscriptionsService.getInscriptionsByStudentId(user.id).subscribe({
          next: (inscriptions) => {
            this.inscriptions = inscriptions;
          },
        });
      }
    });
  }
  

  ngOnInit(): void {
    this.loadCourses();
    this.loadInscriptions();
  }

  getCourseName(courseId: number): string {
    const course = this.courses.find(course => course.id === courseId);
    return course ? course.name : 'Curso Desconocido';
  }


}

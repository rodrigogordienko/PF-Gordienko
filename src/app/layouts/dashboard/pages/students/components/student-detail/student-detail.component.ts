import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStudent } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../students.service';
import { ICourse } from '../../../courses/models';
import { IInscription } from '../../../inscriptions/models';
import { InscriptionsService } from '../../../inscriptions/inscriptions.service';
import { CoursesService } from '../../../courses/courses.service';
import { InscriptionActions } from '../../../inscriptions/store/inscription.actions';
import { Store } from '@ngrx/store';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit, OnDestroy {
  user$: Observable<IStudent | undefined>;
  courses: ICourse[] = [];
  inscriptions$: Observable<IInscription[]> = of([]);

  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private inscriptionsService: InscriptionsService,
    private coursesService: CoursesService,
    private store: Store,
  ) {
    const studentId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.user$ = this.studentsService.getStudentById(studentId);
    this.loadInscriptions(studentId);
  }

  ngOnInit(): void {
    this.loadStudent();
    this.user$.subscribe(user => {
      if (user) {
        this.loadInscriptions(user.id);
      }
    });
    this.loadCourses();
  }

  ngOnDestroy(): void {}

  loadStudent() {
    this.loading = true;
    const studentId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.user$ = this.studentsService.getStudentById(studentId);
    this.loading = false;
  }

  loadInscriptions(studentId: number) {
    this.inscriptions$ = this.inscriptionsService.getInscriptionsByStudentId(studentId);
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });
  }

  getCourseName(courseId: number): string {
    const course = this.courses.find(course => course.id === courseId);
    return course ? course.name : 'Curso Desconocido';
  }

  onDeleteInscription(id: number): void {
    if (confirm('¿Está seguro?')) {
      this.store.dispatch(InscriptionActions.deleteInscriptionById({ id }));
      // Actualizamos la lista de inscripciones después de la eliminación
      this.inscriptions$ = this.inscriptions$.pipe(
        tap((inscriptions) => {
          this.inscriptions$ = of(inscriptions.filter(inscription => inscription.id !== id));
        })
      );
    }
  }
}
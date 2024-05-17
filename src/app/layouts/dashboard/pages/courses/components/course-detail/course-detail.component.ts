import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStudent } from '../../../students/models';
import { ICourse } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../students/students.service';
import { CoursesService } from '../../courses.service';
import { IInscription } from '../../../inscriptions/models';
import { InscriptionsService } from '../../../inscriptions/inscriptions.service';
import { Store } from '@ngrx/store';
import { InscriptionActions } from '../../../inscriptions/store/inscription.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  students: IStudent[] = [];
  inscriptions$: Observable<IInscription[]> = of([]);
  course$: Observable<ICourse | undefined>;
  loading = false;
  courseId = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private inscriptionsService: InscriptionsService,
    private store: Store,
  ) {
    const courseId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.course$ = this.coursesService.getCourseById(courseId);
    this.inscriptions$ = this.inscriptionsService.getInscriptionsByCourseId(courseId);
  }

  ngOnInit(): void {
    this.loadStudents();
    this.course$.subscribe(course => {
      if (course) {
        this.loadInscriptions(course.id);
      }
    });
  }

  ngOnDestroy(): void {}

  loadStudents() {
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
    });
  }

  loadInscriptions(courseId: number) {
    this.inscriptions$ = this.inscriptionsService.getInscriptionsByCourseId(courseId);
  }

  getStudentName(studentId: number): string {
    const student = this.students.find(student => student.id === studentId);
    return student ? student.firstname : 'Alumno Desconocido';
  }

  getStudentSecondName(studentId: number): string {
    const student = this.students.find(student => student.id === studentId);
    return student ? student.secondname : 'Alumno Desconocido';
  }

  onDeleteInscription(id: number): void {
    if (confirm('¿Está seguro?')) {
      this.store.dispatch(InscriptionActions.deleteInscriptionById({ id }));
      // Actualizar la lista de inscripciones después de la eliminación
      this.inscriptions$ = this.inscriptions$.pipe(
        tap((inscriptions) => {
          this.inscriptions$ = of(inscriptions.filter(inscription => inscription.id !== id));
        })
      );
    }
  }
}

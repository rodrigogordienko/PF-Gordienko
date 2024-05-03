import { Component } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { IStudent } from '../../../students/models';
import { ICourse } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../../students/students.service';
import { CoursesService } from '../../courses.service';
import { IInscription } from '../../../inscriptions/models';
import { InscriptionsService } from '../../../inscriptions/inscriptions.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {

  students: IStudent[] = [];
  inscriptions: IInscription[] = [];

  loading = false;
  courseId = 1;
  course$: Observable<ICourse | undefined> ;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studentsSerivice: StudentsService,
    private coursesService: CoursesService,
    private inscriptionsService: InscriptionsService
  ) {
    this.loading = true;
    this.courseId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.course$ = this.coursesService
      .getCourseById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      );
  }

  loadStudents() {
    this.studentsSerivice.getUsers().subscribe({
      next: (students) => {
        this.students = students;
      },
    });
  }

  loadInscriptions(){
    // IMPORTANTE: SIN el course$ no anda xq luego:
    this.course$.subscribe(course => {
      if (course) {
        //ACA ABAJO preciso el course.id, por mas que lo pase de otra forma NO ANDA
      this.inscriptionsService.getInscriptionsByCourseId(course.id).subscribe({
      next: (inscriptionss) => {
        this.inscriptions = inscriptionss;
        console.log(this.inscriptions);
      },
    }); 
  }
}); 
  }
  
/*
  loadCourse() {
    this.coursesService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.course$ = course;
      },
    });
  }
  */

  

  ngOnInit(): void {
    this.loadStudents();
    this.loadInscriptions();
    console.log(this.courseId);
    //this.course$ = this.coursesService.getCourseById(this.courseId);
  }

  getStudentName(studentId: number): string {
    const student = this.students.find(student => student.id === studentId);
    return student ? student.firstname  : 'Alumno Desconocido';
  }

  getStudentSecondName(studentId: number): string {
    const student = this.students.find(student => student.id === studentId);
    return student ? student.secondname  : 'Alumno Desconocido';
  }


}

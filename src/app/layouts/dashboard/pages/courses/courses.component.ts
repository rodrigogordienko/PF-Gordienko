import { Component, ViewChild } from '@angular/core';
import { ICourse } from './models';
import {MatTable, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { CoursesService } from './courses.service';
//import Swal from 'sweetalert2'; 
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CourseActions } from './store/course.actions';
import {
  selectIsLoading,
  selectCourses,
  selectCoursesError,
  selectCourseState,
} from './store/course.selectors';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  //loading = false;
  counter = 0;
  //maxId$: Observable<number>;
  //courses : ICourse[] = []; 
  courses$: Observable<ICourse[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<Error>;
  displayedColumns: string[] = [
    'id',  
    'name',
    'teacher',
    'classes',
    'hours',
    'startDate',
    'actions',
  ];

  constructor(private matDialog : MatDialog, private courseService: CoursesService, private store: Store){
    this.isLoading$ = this.store.select(selectIsLoading);
    this.courses$ = this.store.select(selectCourses);
    this.error$ = this.store
      .select(selectCoursesError)
      .pipe(map((err) => err as Error));
    /*
      this.maxId$ = this.courses$.pipe(
        map(courses => courses.length ? Math.max(...courses.map(course => course.id)) : 0)
      );
      */
      //this.counter = this.maxId$ ;
      this.counter = 1000;

  }

  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());
    /*
    this.maxId$.subscribe(maxId => {
      console.log(`Max ID: ${maxId}`);
    });
    */
  }

  openDialog(editingCourse?: ICourse): void {
    this.courses$.subscribe(courses => {
      let maxId = courses.length > 0 ? Math.max(...courses.map(course => Number(course.id))) : 0;
    this.matDialog
      .open(CourseDialogComponent, {
        data: editingCourse,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingCourse) {
              this.store.dispatch(CourseActions.updateCourse({ id: editingCourse.id, payload: result }));
            } else {
              //this.counter++;
              //result.id = this.counter.toString();
              result.id = (maxId + 1).toString();
              this.store.dispatch(CourseActions.createCourse({ payload: result }));
            }
          }
        },
      });
    }).unsubscribe();
  }

  deleteCourseById(id: number): void {
    Swal.fire({
      icon: 'question',
      html: `Esta seguro?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(CourseActions.deleteCourseById({ id }));
      }
    });
  }


}

  /*
  ngOnInit(): void {
    this.loading = true;
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        console.log('next: ', courses);
        this.courses = courses;
        const maxId = courses.reduce((max, course) => {
          return (course.id > max) ? course.id : max;
        }, 0);
  
        // Asignar el máximo valor de los IDs a counter
        this.counter = maxId;
      },
      error: (err) => {
        console.log('error: ', err);
        //Swal.fire('Error', 'Ocurrio un error', 'error');
      },
      complete: () => {
        console.log('complete');
        this.loading = false;
      },
    });
  }
  */

  /*
  openDialog(editingCourse?: ICourse): void {
    this.matDialog
      .open(CourseDialogComponent, {
        data: editingCourse,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingCourse) {
              /*
              // ACTUALIZAR EL USUARIO EN EL ARRAY
              this.courses = this.courses.map((u) =>
                
                // ... toma todas las propiedades/campos de u, y luego los de result 
              // entonces los que se cambiaron se sobreescriben
                u.id === editingCourse.id ? { ...u, ...result } : u
              );
              */
             // Mantener la fecha original durante la edición
            //result.createdAt = editingCourse.;
            // Actualizar el curso en el array local
            /*
            this.courses = this.courses.map((course) =>
              course.id === editingCourse.id ? { ...course, ...result } : course
            );

            // Llamar al servicio para actualizar el curso
            this.courseService.updateCourse(editingCourse.id, result).subscribe({
              next: (updatedCourse) => {
                // Actualizar el curso en el array local con los datos actualizados del servidor
                this.courses = this.courses.map((course) =>
                  course.id === updatedCourse.id ? updatedCourse : course
                );
              },
              error: (err) => {
                console.log('Error al actualizar el curso:', err);
                // Manejar el error según sea necesario
              }
            });
            } else {
              // LOGICA DE CREAR EL CURSO
              this.counter++;
              result.id = this.counter.toString();
              this.courseService.createCourse(result).subscribe({
                next: (cursoCreado) => {
                  this.courses = [...this.courses, cursoCreado];
                },
              });
            }
          }
        },
      });
  }
  */


  /*
  onDeleteCourse(id: number): void {
    if (confirm('¿Está seguro?')) {
      this.courseService.deleteCourseById(id).subscribe({
        next: () => {
          this.courses = this.courses.filter((course) => course.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar el estudiante:', err);
        }
      });
    }
  }
  */


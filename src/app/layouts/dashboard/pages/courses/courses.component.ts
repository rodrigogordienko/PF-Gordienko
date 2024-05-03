import { Component, ViewChild } from '@angular/core';
import { ICourse } from './models';
import {MatTable, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { CoursesService } from './courses.service';
//import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  loading = false;
  counter = 0;

  courses : ICourse[] = [];
  
  displayedColumns: string[] = [
    'id',  
    'name',
    'teacher',
    'classes',
    'hours',
    'startDate',
    'actions',
  ];

  constructor(private matDialog : MatDialog, private courseService: CoursesService){
    
  }

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


  onDeleteCourse(id: number): void {
    if (confirm('¿Está seguro?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          this.courses = this.courses.filter((course) => course.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar el estudiante:', err);
        }
      });
    }
  }

}

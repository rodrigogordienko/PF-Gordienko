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

  courses : ICourse[] = [];
  
  displayedColumns: string[] = [
    'id',  
    'name',
    'teacher',
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
              // ACTUALIZAR EL USUARIO EN EL ARRAY
              this.courses = this.courses.map((u) =>
                
                // ... toma todas las propiedades/campos de u, y luego los de result 
              // entonces los que se cambiaron se sobreescriben
                u.id === editingCourse.id ? { ...u, ...result } : u
              );
            } else {
              // LOGICA DE CREAR EL USUARIO
              result.id = new Date().getTime().toString().substring(0, 3);
              this.courses = [...this.courses, result];
            }
          }
        },
      });
  }

  onDeleteCourse(id: number): void {
    if (confirm('Esta seguro?')) {
      this.courses = this.courses.filter((u) => u.id != id);
    }
  }

}

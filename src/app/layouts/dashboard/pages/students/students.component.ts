import { Component, ViewChild } from '@angular/core';
import { IStudent } from './models';
import {MatTable, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { StudentsService } from './students.service';
//import Swal from 'sweetalert2'; 


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  loading = false;
  counter = 0;

  students : IStudent[] = [];
  
  displayedColumns: string[] = [
    'id',
    'fullname',  
    //'secondname', unimos nombre y apellido con un pipe
    'email',
    //'course',
    'address',
    'phone',
    'createdAt',
    'actions',
  ];
  
  //dataSource = [...ELEMENT_DATA]; 

    /*
  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    //this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    //this.table.renderRows();
  }
  */

  constructor(private matDialog : MatDialog, private studentsService: StudentsService){
    
  }

  ngOnInit(): void {
    this.loading = true;
    this.studentsService.getUsers().subscribe({
      next: (students) => {
        console.log('next: ', students);
        this.students = students;
        const maxId = students.reduce((max, student) => {
          return (student.id > max) ? student.id : max;
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


  openDialog(editingStudent?: IStudent): void {
    this.matDialog
      .open(UserDialogComponent, {
        data: editingStudent,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingStudent) {
              /*
              // ACTUALIZAR EL USUARIO EN EL ARRAY
              this.students = this.students.map((u) =>
                // ... toma todas las propiedades/campos de u, y luego los de result 
              // entonces los que se cambiaron se sobreescriben
                u.id === editingUser.id ? { ...u, ...result } : u
              );
              */
              // Mantener la fecha original durante la edición
            result.createdAt = editingStudent.createdAt;
            // Actualizar el estudiante en el array local
            this.students = this.students.map((student) =>
              student.id === editingStudent.id ? { ...student, ...result } : student
            );

            // Llamar al servicio para actualizar el estudiante
            this.studentsService.updateStudent(editingStudent.id, result).subscribe({
              next: (updatedStudent) => {
                // Actualizar el estudiante en el array local con los datos actualizados del servidor
                this.students = this.students.map((student) =>
                  student.id === updatedStudent.id ? updatedStudent : student
                );
              },
              error: (err) => {
                console.log('Error al actualizar el estudiante:', err);
                // Manejar el error según sea necesario
              }
            });

            } else {
              // LOGICA DE CREAR EL USUARIO
              //result.id = new Date().getTime().toString().substring(0, 3);
              this.counter++;
              result.id = this.counter.toString();
              
              result.createdAt = new Date();
              this.studentsService.createUser(result).subscribe({
                next: (usuarioCreado) => {
                  this.students = [...this.students, usuarioCreado];
                },
              });
            }
          }
        },
      });
  }

  /*
  onDeleteUser(id: number): void {
    if (confirm('Esta seguro?')) {
      this.students = this.students.filter((u) => u.id != id);
    }
  }
  */
  onDeleteUser(id: number): void {
    if (confirm('¿Está seguro?')) {
      this.studentsService.deleteStudent(id).subscribe({
        next: () => {
          this.students = this.students.filter((student) => student.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar el estudiante:', err);
        }
      });
    }
  }

}

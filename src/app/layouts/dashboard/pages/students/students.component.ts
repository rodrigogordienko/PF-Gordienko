import { Component, ViewChild } from '@angular/core';
import { IStudent } from './models';
import {MatTable, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { StudentsService } from './students.service';
//import Swal from 'sweetalert2'; 

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
/*
const ELEMENT_DATA: IStudent[] = [
  { id: 1 , firstname: "Cristiano" , secondname: "Ronaldo", email: "cristiano@gmail.com" , createdAt: new Date(), course: "Angular"},
  { id: 2 , firstname: "Lionel" , secondname: "Messi", email: "messi@gmail.com" , createdAt: new Date(), course: "React Js"},
  { id: 3 , firstname: "Luis" , secondname: "Suarez", email: "suarez@gmail.com" , createdAt: new Date(), course: "Python"},
  { id: 4 , firstname: "Toni" , secondname: "Kroos", email: "kroos@gmail.com" , createdAt: new Date(), course: "Java"},
  { id: 5 , firstname: "Karim" , secondname: "Benzema", email: "benzema@gmail.com" , createdAt: new Date(), course: "React Js"},
  { id: 6 , firstname: "Luka" , secondname: "Modric", email: "modric@gmail.com" , createdAt: new Date(), course: "Base de Datos"},
  { id: 7 , firstname: "Federico" , secondname: "Valverde", email: "valverde@gmail.com" , createdAt: new Date(), course: "Python"},
  { id: 8 , firstname: "Vinicius" , secondname: "Jr", email: "vinicius@gmail.com" , createdAt: new Date(), course: "Angular"},
];
*/

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  loading = false;

  students : IStudent[] = [];
  
  displayedColumns: string[] = [
    'id',
    'fullname',  
    //'secondname', unimos nombre y apellido con un pipe
    'email',
    'course',
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


  openDialog(editingUser?: IStudent): void {
    this.matDialog
      .open(UserDialogComponent, {
        data: editingUser,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingUser) {
              // ACTUALIZAR EL USUARIO EN EL ARRAY
              this.students = this.students.map((u) =>
                // ... toma todas las propiedades/campos de u, y luego los de result 
              // entonces los que se cambiaron se sobreescriben
                u.id === editingUser.id ? { ...u, ...result } : u
              );
            } else {
              // LOGICA DE CREAR EL USUARIO
              result.id = new Date().getTime().toString().substring(0, 3);
              result.createdAt = new Date();
              this.students = [...this.students, result];
            }
          }
        },
      });
  }

  onDeleteUser(id: number): void {
    if (confirm('Esta seguro?')) {
      this.students = this.students.filter((u) => u.id != id);
    }
  }

}

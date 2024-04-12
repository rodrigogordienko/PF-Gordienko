import { Component, ViewChild } from '@angular/core';
import { IStudent } from './models';
import {MatTable, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

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

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  /*
  columns = [
    {
      columnDef: 'id',
      header: 'No.',
      cell: (element: IStudent) => `${element.id}`,
    },
    {
      columnDef: 'name',
      header: 'Nombre',
      cell: (element: IStudent) => `${element.firstname}`,
    },
    {
      columnDef: 'secondname',
      header: 'Apellido',
      cell: (element: IStudent) => `${element.secondname}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (element: IStudent) => `${element.email}`,
    },
    {
      columnDef: 'date',
      header: 'Fecha de Registro',
      cell: (element: IStudent) => `${element.createdAt}`,
    },
  ];*/
  displayedColumns: string[] = [
    'id',
    'fullname',  
    //'secondname', unimos nombre y apellido con un pipe
    'email',
    'course',
    'createdAt',
    'actions',
  ];
  
 // displayedColumns = this.columns.map(c => c.columnDef);


  dataSource = [...ELEMENT_DATA]; 
  //@ViewChild(MatTable) table: MatTable<IStudent>;

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

  constructor(private matDialog : MatDialog){
    
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
              this.dataSource = this.dataSource.map((u) =>
                // ... toma todas las propiedades/campos de u, y luego los de result 
              // entonces los que se cambiaron se sobreescriben
                u.id === editingUser.id ? { ...u, ...result } : u
              );
            } else {
              // LOGICA DE CREAR EL USUARIO
              result.id = new Date().getTime().toString().substring(0, 3);
              result.createdAt = new Date();
              this.dataSource = [...this.dataSource, result];
            }
          }
        },
      });
  }

  onDeleteUser(id: number): void {
    if (confirm('Esta seguro?')) {
      this.dataSource = this.dataSource.filter((u) => u.id != id);
    }
  }

  // dataSource = students;

}

import { Component, ViewChild } from '@angular/core';
import { IClass } from './models';
import {MatTable, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ClassesDialogComponent } from './components/classes-dialog/classes-dialog.component';
import { OnlineClassesService } from './onlineClasses.service';
//import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-online-classes',
  templateUrl: './onlineClasses.component.html',
  styleUrl: './onlineClasses.component.scss'
})
export class OnlineClassesComponent {

  loading = false;

  classes : IClass[] = [];
  
  displayedColumns: string[] = [
    'id',
    'teacher',  
    'course',
    'hour',
    'actions',
  ];

  constructor(private matDialog : MatDialog, private onlineClassesService: OnlineClassesService){
    
  }

  ngOnInit(): void {
    this.loading = true;
    this.onlineClassesService.getClasses().subscribe({
      next: (classes) => {
        console.log('next: ', classes);
        this.classes = classes;
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


  openDialog(editingClass?: IClass): void {
    this.matDialog
      .open(ClassesDialogComponent, {
        data: editingClass,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingClass) {
              // ACTUALIZAR EL USUARIO EN EL ARRAY

              const horaSeleccionadaString = result.hour; // Obtener la hora como string

              // Convertimos la hora de string a Date
              const horaSeleccionadaDate = new Date();
              const [hours, minutes] = horaSeleccionadaString.split(':').map(Number);
              horaSeleccionadaDate.setHours(hours);
              horaSeleccionadaDate.setMinutes(minutes);
              console.log('Hora seleccionada:', horaSeleccionadaDate);
              result.hour = horaSeleccionadaDate;


              this.classes = this.classes.map((u) =>
                
                // ... toma todas las propiedades/campos de u, y luego los de result 
              // entonces los que se cambiaron se sobreescriben
                u.id === editingClass.id ? { ...u, ...result } : u
              );
            } else {
              // LOGICA DE CREAR LA CALSE
              result.id = new Date().getTime().toString().substring(0, 3);
              const horaSeleccionadaString = result.hour; // Obtener la hora como string

              // Convertimos la hora de string a Date
              const horaSeleccionadaDate = new Date();
              const [hours, minutes] = horaSeleccionadaString.split(':').map(Number);
              horaSeleccionadaDate.setHours(hours);
              horaSeleccionadaDate.setMinutes(minutes);
              console.log('Hora seleccionada:', horaSeleccionadaDate);
              result.hour = horaSeleccionadaDate;
              this.onlineClassesService.createClass(result).subscribe({
                next: (claseCreada) => {
                  this.classes = [...this.classes, claseCreada];
                },
              });
            }
          }
        },
      });
  }

  onDeleteClass(id: number): void {
    if (confirm('Esta seguro?')) {
      this.classes = this.classes.filter((u) => u.id != id);
    }
  }

}

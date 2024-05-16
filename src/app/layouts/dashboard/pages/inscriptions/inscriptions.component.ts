import { Component, ViewChild } from '@angular/core';
import { IInscription } from './models';
import {MatTable, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionsDialogComponent } from './components/inscriptions-dialog/inscriptions-dialog.component';
import { InscriptionsService } from './inscriptions.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable, Subscription, async } from 'rxjs';
import { IUser } from '../users/models';
import { StudentsService } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';
//import Swal from 'sweetalert2'; 
import { UsersService } from '../users/users.service';
import { ICourse } from '../courses/models';
import { IStudent } from '../students/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent {

  loading = false;

  inscriptions : IInscription[] = [];
  courses: ICourse[] = [];
  students: IStudent[] = [];
  users: IUser[] = [];
  authUser$: Observable<IUser | null>;
  authUserSubscription?: Subscription;
  counter = 0;

  authUserSinPipe: IUser | null = null;
  
  displayedColumns: string[] = [
    'id',
    'student',  
    'course',
    'hour',
    'user',
    'actions',
  ];

  constructor(private matDialog : MatDialog, private inscriptionsService: InscriptionsService,
    private authService: AuthService, private studentsService: StudentsService,
    private coursesService: CoursesService, private usersService: UsersService){
    this.authUser$ = this.authService.authUser$; 
    
  }

  ngOnDestroy(): void {
    this.authUserSubscription?.unsubscribe();
  }


  loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });
  }

  loadStudents() {
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
    });
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }

  getUserName(userId: number): string {
    // Suponiendo que tienes una colección de usuarios llamada 'users'
    const user = this.users.find(user => user.id === userId);
    return user ? user.firstname : ''; // Devuelve el nombre del usuario si se encuentra, de lo contrario devuelve una cadena vacía
  }

  getStudentName(userId: number): string {
    // Suponiendo que tienes una colección de usuarios llamada 'users'
    const student = this.students.find(student => student.id === userId);
    return student ? student.firstname : ''; // Devuelve el nombre del usuario si se encuentra, de lo contrario devuelve una cadena vacía
  }

  getStudentSecondName(userId: number): string {
    // Suponiendo que tienes una colección de usuarios llamada 'users'
    const student = this.students.find(student => student.id === userId);
    return student ? student.secondname : ''; // Devuelve el nombre del usuario si se encuentra, de lo contrario devuelve una cadena vacía
  }

  getCourseName(userId: number): string {
    // Suponiendo que tienes una colección de usuarios llamada 'users'
    const course = this.courses.find(course => course.id === userId);
    return course ? course.name : ''; // Devuelve el nombre del usuario si se encuentra, de lo contrario devuelve una cadena vacía
  }
  

  ngOnInit(): void {
  this.authUserSubscription = this.authService.authUser$.subscribe({
      next: (user) => {
        this.authUserSinPipe = user;
      },
    });

    this.loading = true;
    this.inscriptionsService.getInscriptions().subscribe({
      next: (inscriptions) => {
        //console.log('next: ', classes);
        this.inscriptions = inscriptions;
        const maxId = inscriptions.reduce((max, inscription) => {
          return (inscription.id > max) ? inscription.id : max;
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
    this.loadCourses();
    this.loadStudents();
    this.loadUsers();
    
  }


  openDialog(editingInscription?: IInscription): void {
    this.matDialog
      .open(InscriptionsDialogComponent, {
        data: editingInscription,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingInscription) {
               result.hour = editingInscription.hour;
               result.user = editingInscription.user;
            // Actualizar la inscripción en el array local
            this.inscriptions = this.inscriptions.map((inscription) =>
              inscription.id === editingInscription.id ? { ...inscription, ...result } : inscription
            );

            // Llamar al servicio para actualizar la inscripción
            this.inscriptionsService.updateInscription(editingInscription.id, result).subscribe({
              next: (updatedInscription) => {
                // Actualizar la inscripción en el array local con los datos actualizados del servidor
                this.inscriptions = this.inscriptions.map((inscription) =>
                  inscription.id === updatedInscription.id ? updatedInscription : inscription
                );
              },
              error: (err) => {
                console.log('Error al actualizar la inscripción:', err);
                // Manejar el error según sea necesario
              }
            });
              /*
              // ACTUALIZAR EL USUARIO EN EL ARRAY

              // Convertimos la hora de string a Date
              const horaSeleccionadaDate = new Date();
              result.hour = horaSeleccionadaDate;
              this.inscriptions = this.inscriptions.map((u) =>
                
                // ... toma todas las propiedades/campos de u, y luego los de result 
              // entonces los que se cambiaron se sobreescriben
                u.id === editingInscription.id ? { ...u, ...result } : u
              );
              */
            } else {
              // LOGICA DE CREAR LA CALSE
              console.log("tamo en registro de inscripcion, antes del user");
              console.log(this.authUserSinPipe?.id)
              result.user = this.authUserSinPipe?.id.toString();
              /*
              const currentTime = new Date().getTime();
              const currentMilliseconds = new Date().getMilliseconds();
              const combinedValue = currentTime.toString() + currentMilliseconds.toString();
              const idAux = combinedValue.substring(0, 3);
              */
              this.counter++;
              result.id = this.counter.toString();
              const horaSeleccionadaDate = new Date();
              result.hour = horaSeleccionadaDate;
              this.inscriptionsService.createInscription(result).subscribe({
                next: (inscriptionCreada) => {
                  this.inscriptions = [...this.inscriptions, inscriptionCreada];
                },
              });
            }
          }
        },
      });
  }
  /*
  onDeleteInscription(id: number): void {
    if (confirm('Esta seguro?')) {
      this.inscriptions = this.inscriptions.filter((u) => u.id != id);
    }
  }
  */
  onDeleteInscription(id: number): void {
    if (confirm('¿Está seguro?')) {
      this.inscriptionsService.deleteInscription(id).subscribe({
        next: () => {
          this.inscriptions = this.inscriptions.filter((inscription) => inscription.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar la inscripción:', err);
        }
      });
    }
  }
  

}

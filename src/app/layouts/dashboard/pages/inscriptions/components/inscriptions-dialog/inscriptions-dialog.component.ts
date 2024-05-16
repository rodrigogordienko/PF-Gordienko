import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IInscription } from '../../models';
import { ICourse } from '../../../courses/models';
import { CoursesService } from '../../../courses/courses.service';
import { InscriptionsService } from '../../inscriptions.service';
import { StudentsService } from '../../../students/students.service';
import { IStudent } from '../../../students/models';

@Component({
  selector: 'app-inscriptions-dialog',
  templateUrl: './inscriptions-dialog.component.html',
  styleUrl: './inscriptions-dialog.component.scss'
})
export class InscriptionsDialogComponent {

  inscriptions: IInscription[] = [];
  courses: ICourse[] = [];
  students: IStudent[] = [];
  
  
  classForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<InscriptionsDialogComponent>,
    private inscriptionsService: InscriptionsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA) private editingInscription?: IInscription
  ) {
    this.classForm = this.formBuilder.group({
      course: [[Validators.required]],
      student: [[Validators.required]],
    });

    // Para editar el usuario si es que me lo amndan
    if (editingInscription) {
      this.classForm.patchValue(editingInscription);
    }
  }

  ngOnInit(): void {
    this.loadInscriptions();
    this.loadCourses();
    this.loadStudents();
  }

  loadInscriptions() {
    this.inscriptionsService.getInscriptions().subscribe({
      next: (inscriptions) => {
        this.inscriptions = inscriptions;
      },
    });
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

  get teacherControl() {
    return this.classForm.get('teacher');
  }


  onSave(): void {
    if (this.classForm.invalid) {
      this.classForm.markAllAsTouched();
    } else {
      // SI EL FORM SI ES VALIDO...
      this.matDialogRef.close(this.classForm.value); 
      // Al hacer close, el valor del formulario va para quien lo abrio
      // En nuestro caso, en el OpenDialog() del componente  Student
    } 
  }
  

}

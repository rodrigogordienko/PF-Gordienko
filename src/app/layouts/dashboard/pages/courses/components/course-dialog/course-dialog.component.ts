import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../models';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss'
})
export class CourseDialogComponent {
  
  courseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingCourse?: ICourse
  ) {
    this.courseForm = this.formBuilder.group({
      teacher: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
          Validators.maxLength(20),
          Validators.minLength(2),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9 ]+$'),
          Validators.maxLength(20),
          Validators.minLength(2),
        ],
      ],
      startDate: ['']
    });

    // Para editar el usuario si es que me lo amndan
    if (editingCourse) {
      this.courseForm.patchValue(editingCourse);
    }
  }

  get teacherControl() {
    return this.courseForm.get('teacher');
  }

  get courseControl() {
    return this.courseForm.get('name');
  }


  onSave(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      // SI EL FORM SI ES VALIDO...
      this.matDialogRef.close(this.courseForm.value); 
      // Al hacer close, el valor del formulario va para quien lo abrio
      // En nuestro caso, en el OpenDialog() del componente  Student
    } 
  }
  

}

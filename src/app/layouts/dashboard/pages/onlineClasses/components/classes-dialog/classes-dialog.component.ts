import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClass } from '../../models';
import { ICourse } from '../../../courses/models';
import { CoursesService } from '../../../courses/courses.service';

@Component({
  selector: 'app-classes-dialog',
  templateUrl: './classes-dialog.component.html',
  styleUrl: './classes-dialog.component.scss'
})
export class ClassesDialogComponent {

  courses: ICourse[] = [];
  
  classForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ClassesDialogComponent>,
    private courseService: CoursesService,
    @Inject(MAT_DIALOG_DATA) private editingClass?: IClass
  ) {
    this.classForm = this.formBuilder.group({
      teacher: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
          Validators.maxLength(20),
          Validators.minLength(2),
        ],
      ],
      course: [[Validators.required]],
      hour: ['']
    });

    // Para editar el usuario si es que me lo amndan
    if (editingClass) {
      this.classForm.patchValue(editingClass);
    }
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
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

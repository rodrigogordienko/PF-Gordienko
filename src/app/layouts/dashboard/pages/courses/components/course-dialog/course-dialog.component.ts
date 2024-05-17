import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../models';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent {
  
  courseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingCourse?: ICourse
  ) {
    this.courseForm = this.formBuilder.group({
      name: [
        this.editingCourse ? this.editingCourse.name : '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      teacher: [
        this.editingCourse ? this.editingCourse.teacher : '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$'),
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      startDate: [
        this.editingCourse ? this.editingCourse.startDate : '',
        Validators.required,
      ],
      hours: [
        this.editingCourse ? this.editingCourse.hours : null,
        [
          Validators.required,
          Validators.min(1),
        ],
      ],
      classes: [
        this.editingCourse ? this.editingCourse.classes : null,
        [
          Validators.required,
          Validators.min(1),
        ],
      ],
    });
  }

  onSave(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.courseForm.value); 
    } 
  }
}
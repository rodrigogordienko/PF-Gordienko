import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStudent } from '../../models';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingUser?: IStudent
  ) {
    this.userForm = this.formBuilder.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
          Validators.maxLength(20),
          Validators.minLength(2),
        ],
      ],
      secondname: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
          Validators.maxLength(20),
          Validators.minLength(2), 
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
      course: [[Validators.required]],
    });

    // Para editar el usuario si es que me lo amndan
    if (editingUser) {
      this.userForm.patchValue(editingUser);
    }
  }

  get firstnameControl() {
    return this.userForm.get('firstname');
  }

  get secondnameControl() {
    return this.userForm.get('secondname');
  }

  onSave(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      // SI EL FORM SI ES VALIDO...
      this.matDialogRef.close(this.userForm.value); 
      // Al hacer close, el valor del formulario va para quien lo abrio
      // En nuestro caso, en el OpenDialog() del componente  Student
    } 
  }
  

}

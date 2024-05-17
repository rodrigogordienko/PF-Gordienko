import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser, UserRole } from '../../models';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  roles: UserRole[] = ['ADMIN', 'TEACHER', 'USER'];
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingUser?: IUser
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstname: [
        this.editingUser ? this.editingUser.firstname : '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
          Validators.maxLength(20),
          Validators.minLength(2),
        ],
      ],
      secondname: [
        this.editingUser ? this.editingUser.secondname : '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
          Validators.maxLength(20),
          Validators.minLength(2), 
        ],
      ],
      email: [
        this.editingUser ? this.editingUser.email : '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
      role: ['USER', [Validators.required]],
      address: [
        this.editingUser ? this.editingUser.address : '',
        [
          Validators.required,
          Validators.minLength(5),
        ],
      ],
      phone: [
        this.editingUser ? this.editingUser.phone : '',
        [
          Validators.required,
          Validators.pattern('[0-9]{7,10}'),
        ],
      ],
    });
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
      this.matDialogRef.close(this.userForm.value); 
    } 
  }
}

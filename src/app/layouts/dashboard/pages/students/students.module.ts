import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';


@NgModule({
  declarations: [
    StudentsComponent,
    UserDialogComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
  ],
  exports:[
    StudentsComponent
  ]
})
export class StudentsModule { }

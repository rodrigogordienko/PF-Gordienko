import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    StudentsComponent,
    UserDialogComponent
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

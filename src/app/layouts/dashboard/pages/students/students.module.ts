import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './store/student.effects';
import { StoreModule } from '@ngrx/store';
import { studentFeature } from './store/student.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StudentsService } from './students.service';

export const STUDENTS = new InjectionToken('STUDENTS');
export const RANDOM_NUMBER = new InjectionToken('RANDOM_NUMBER');

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
    MatProgressSpinnerModule,
    StoreModule.forFeature(studentFeature),
    EffectsModule.forFeature([StudentEffects]),
  ],
  providers: [
    // CoursesService,
    {
      provide: StudentsService,
      useClass: StudentsService,
    },
    {
      provide: RANDOM_NUMBER,
      useFactory: () => {
        return Math.random();
      },
    },
    {
      provide: STUDENTS,
      useFactory: (studentsService: StudentsService) => {
        return studentsService.getStudents();
      },
      deps: [StudentsService],
    },
  ],
  exports:[
    StudentsComponent
  ]
})
export class StudentsModule { }
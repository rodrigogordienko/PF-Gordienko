import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    CourseDialogComponent,
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
  ]
})
export class CoursesModule { }

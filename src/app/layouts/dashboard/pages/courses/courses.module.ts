import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './store/course.effects';
import { StoreModule } from '@ngrx/store';
import { courseFeature } from './store/course.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoursesService } from './courses.service';

export const COURSES = new InjectionToken('COURSES');
export const RANDOM_NUMBER = new InjectionToken('RANDOM_NUMBER');

@NgModule({
  declarations: [
    CourseDialogComponent,
    CoursesComponent,
    CourseDetailComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(courseFeature),
    EffectsModule.forFeature([CourseEffects]),
  ],
  providers: [
    // CoursesService,
    {
      provide: CoursesService,
      useClass: CoursesService,
    },
    {
      provide: RANDOM_NUMBER,
      useFactory: () => {
        return Math.random();
      },
    },
    {
      provide: COURSES,
      useFactory: (courseService: CoursesService) => {
        return courseService.getCourses();
      },
      deps: [CoursesService],
    },
  ],
  exports: [CoursesComponent],
})
export class CoursesModule { }
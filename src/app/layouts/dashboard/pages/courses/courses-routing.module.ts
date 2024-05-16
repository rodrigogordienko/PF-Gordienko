import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';

const routes: Routes = [

  {
    path: '',
    component: CoursesComponent,
  },
  {
    // /dashboard/users/:id
    path: ':id',
    data: {
      title: 'Detalles del Curso',
    },
    component: CourseDetailComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentsComponent } from './students.component';

const routes: Routes = [
  /**
   * Path actual: /dashboard/users
   */
  {
    path: '',
    component: StudentsComponent,
  },
  {
    // /dashboard/users/:id
    path: ':id',
    data: {
      title: 'Perfil',
    },
    component: StudentDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }

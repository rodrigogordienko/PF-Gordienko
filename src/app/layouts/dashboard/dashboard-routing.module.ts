import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  /**
   * Path actual: /dashboard
   */
  {
    path: 'home',
    data: {
      title: 'Inicio',
    },
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'students',
    data: {
      title: 'Estudiantes',
    },
    loadChildren: () =>
      import('./pages/students/students.module').then((m) => m.StudentsModule), 
  },
  {
    path: 'courses',
    data: {
      title: 'Cursos',
    },
    loadChildren: () =>
      import('./pages/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'inscriptions',
    data: {
      title: 'Inscripciones',
    },
    loadChildren: () =>
      import('./pages/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
  },
  {
    path: 'users',
    data: {
      title: 'Usuarios',
    },
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: '',
    pathMatch: 'full',
    data: { title: 'Inicio' },
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

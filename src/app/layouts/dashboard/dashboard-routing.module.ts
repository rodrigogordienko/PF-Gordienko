import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { OnlineClassesModule } from './pages/onlineClasses/onlineClasses.module';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  /**
   * Path actual: /dashboard
   */
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'students',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./pages/students/students.module').then((m) => m.StudentsModule), 
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./pages/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'classes',
    loadChildren: () =>
      import('./pages/onlineClasses/onlineClasses.module').then((m) => m.OnlineClassesModule),
  },
  {
    path: 'inscriptions',
    loadChildren: () =>
      import('./pages/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

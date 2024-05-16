import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  /**
   * Path actual: /dashboard/users
   */
  {
    path: '',
    component: UsersComponent,
  },
  {
    // /dashboard/users/:id
    path: ':id',
    data: {
      title: 'Perfil',
    },
    component: UserDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

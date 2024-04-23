import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineClassesComponent} from './onlineClasses.component';

const routes: Routes = [
  /**
   * Path actual: /dashboard/classes
   */
  {
    path: '',
    component: OnlineClassesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineClassesRoutingModule { }

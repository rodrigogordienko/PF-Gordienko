import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { StudentsModule } from './pages/students/students.module';
import { SharedModule } from '../../shared/shared.module';
import { UsersModule } from './pages/users/users.module'; 


@NgModule({
  declarations: [
    DashboardComponent,
    //UsersComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    StudentsModule,
    SharedModule,
    UsersModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }

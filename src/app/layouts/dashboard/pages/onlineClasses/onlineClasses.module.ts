import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineClassesRoutingModule } from './onlineClasses-routing.module';
import { OnlineClassesComponent } from './onlineClasses.component';
import { ClassesDialogComponent } from './components/classes-dialog/classes-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { OnlineClassesService } from './onlineClasses.service';


@NgModule({
  declarations: [
    OnlineClassesComponent,
    ClassesDialogComponent,
  ],
  imports: [
    CommonModule,
    OnlineClassesRoutingModule,
    SharedModule,
  ],
  exports:[
    OnlineClassesComponent
  ]
})
export class OnlineClassesModule { }

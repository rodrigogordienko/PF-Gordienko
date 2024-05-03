import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionsDialogComponent } from './components/inscriptions-dialog/inscriptions-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { InscriptionsService } from './inscriptions.service';


@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionsDialogComponent,
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule,
  ],
  exports:[
    InscriptionsComponent
  ]
})
export class InscriptionsModule { }

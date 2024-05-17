import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionsDialogComponent } from './components/inscriptions-dialog/inscriptions-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { InscriptionsService } from './inscriptions.service';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionEffects } from './store/inscription.effects'; 
import { StoreModule } from '@ngrx/store';
import { inscriptionsFeature } from './store/inscription.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const INSCRIPTIONS = new InjectionToken('INSCRIPTIONS');
export const RANDOM_NUMBER = new InjectionToken('RANDOM_NUMBER');

@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionsDialogComponent,
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(inscriptionsFeature),
    EffectsModule.forFeature([InscriptionEffects]),
  ],
  providers: [
    {
      provide: InscriptionsService,
      useClass: InscriptionsService,
    },
    {
      provide: RANDOM_NUMBER,
      useFactory: () => {
        return Math.random();
      },
    },
    {
      provide: INSCRIPTIONS,
      useFactory: (inscriptionService: InscriptionsService) => {
        return inscriptionService.getInscriptions();
      },
      deps: [InscriptionsService],
    },
  ],
  exports:[
    InscriptionsComponent
  ]
})
export class InscriptionsModule { }
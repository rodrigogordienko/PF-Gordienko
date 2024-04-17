import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncObservablePipeComponent } from './async-observable-pipe.component';



@NgModule({
  declarations: [
    AsyncObservablePipeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AsyncObservablePipeComponent]
})
export class AsyncObservablePipeModule { }

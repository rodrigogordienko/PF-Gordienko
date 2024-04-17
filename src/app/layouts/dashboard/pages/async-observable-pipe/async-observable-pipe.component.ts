import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'async-observable-pipe', 
  template: '<div>Time: {{ time | async }}</div>',
  styleUrl: './async-observable-pipe.component.scss' 
})
export class AsyncObservablePipeComponent {
  constructor(){}
  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000); 
  });
}


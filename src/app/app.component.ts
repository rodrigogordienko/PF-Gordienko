import { Component } from '@angular/core';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProyectoCurso';

  constructor() {
    if (!environment.isProd) {
      console.log(environment);
    }
  }
  
}

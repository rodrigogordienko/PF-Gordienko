import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [ReactiveFormsModule,
        SharedModule,
        MatCardModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Llamamos a AuthService.login() luego de que el formulario sea valido', () => {
    const formData = { email: 'admin@mail.com', password: 'admin' };
    component.loginForm.setValue(formData);

    component.login();

    expect(authService.login).toHaveBeenCalledWith(formData);
  });

  it('Formulario invalido => No deberia llamarse a AuthService.login() ', () => {
    const formData = { email: '', password: '' };
    component.loginForm.setValue(formData);

    component.login();

    expect(authService.login).not.toHaveBeenCalled();
  });
});

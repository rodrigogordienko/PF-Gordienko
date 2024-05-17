import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { authActions } from '../../store/auth/auth.actions';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let store: MockStore;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        MatCardModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        provideMockStore()
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Llamamos a authActions.login luego de que el formulario sea valido', () => {
    const formData = { email: 'admin@mail.com', password: 'admin' };
    component.loginForm.setValue(formData);

    spyOn(store, 'dispatch');

    component.login();

    expect(store.dispatch).toHaveBeenCalledWith(authActions.login({ payload: formData }));
  });

  it('Formulario invalido => No deberia llamarse a authActions.login', () => {
    const formData = { email: '', password: '' };
    component.loginForm.setValue(formData);

    spyOn(store, 'dispatch');

    component.login();

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
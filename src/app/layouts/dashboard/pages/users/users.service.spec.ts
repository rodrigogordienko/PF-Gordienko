import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { environment } from '../../../../../environments/environment.development';
import { IUser } from './models';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Obtenemos los usuarios ingresados en la API a traves de GET', () => {
    const mockUsers: IUser[] = [
      {
        id: 1,
        createdAt: new Date("2024-05-02T01:14:53.907Z"),
        email: "adminmail@mail.com",
        firstname: "soyadmin",
        secondname: "apellido",
        role: "ADMIN"
      },
      {
        id: 2,
        createdAt: new Date("2024-05-02T01:14:53.907Z"),
        email: "sofia@mail.com",
        firstname: "Sofía",
        secondname: "L",
        role: "TEACHER"
      },
      {
        id: 3,
        createdAt: new Date("2024-05-02T01:14:53.907Z"),
        email: "josue@mail.com",
        firstname: "Josué",
        secondname: "B",
        role: "TEACHER"
      }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const request = httpMock.expectOne(environment.baseAPIURL + '/users');
    expect(request.request.method).toBe('GET');
    request.flush(mockUsers);
  });
});

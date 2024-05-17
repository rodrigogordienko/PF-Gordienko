import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoursesService } from './courses.service';
import { ICourse } from './models';
import { environment } from '../../../../../environments/environment.development';

const mockCourses : ICourse[] = [
  { id: 1, teacher: "Josué", name: "Angular", startDate: new Date("2024-04-04T00:00:00.000Z"), hours: 40, classes: 20 },
  { id: 2, teacher: "Sofía", name: "React Js", startDate: new Date("2024-04-18T00:00:00.000Z"), hours: 36, classes: 18 },
  { id: 3, teacher: "Josué", name: "Python", startDate: new Date("2024-05-16T00:00:00.000Z"), hours: 44, classes: 22 },
  { id: 4, teacher: "Sofía", name: "Java", startDate: new Date("2024-07-17T00:00:00.000Z"), hours: 50, classes: 25 }
];

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });
    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Obtenemos los cursos ingresados en la API a traves del metodo GET', () => {
    const mockCourses = [
      { id: 1, name: "Angular", teacher: "Josué", startDate: new Date("2024-04-04T00:00:00.000Z"), hours: 40, classes: 20 },
      { id: 2, name: "React Js", teacher: "Sofía", startDate: new Date("2024-04-18T00:00:00.000Z"), hours: 36, classes: 18 },
      { id: 3, teacher: "Josué", name: "Python", startDate: new Date("2024-05-16T00:00:00.000Z"), hours: 44, classes: 22 },
    { id: 4, teacher: "Sofía", name: "Java", startDate: new Date("2024-07-17T00:00:00.000Z"), hours: 50, classes: 25 }
      
    ];

    service.getCourses().subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(environment.baseAPIURL + '/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);  
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentsService } from './students.service';
import { environment } from '../../../../../environments/environment.development';
import { CreateStudentPayload, IStudent } from './models';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentsService]
    });
    service = TestBed.inject(StudentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia obtener los estudiantes a traves de la API con el metodo GET', () => {
    const mockStudents = [
      {
        id: 1,
        firstname: "Cristiano",
        secondname: "Ronaldo",
        email: "cristiano@gmail.com",
        createdAt: new Date("2024-05-02T00:00:00.000Z"),
        phone: 123456789,
        address: "Calle Principal 123"
    },
    {
        id: 2,
        firstname: "Lionel",
        secondname: "Messi",
        email: "messi@gmail.com",
        createdAt: new Date("2024-05-02T00:00:00.000Z"),
        phone: 987654321,
        address: "Avenida Central 456"
    },
    {
        id: 3,
        firstname: "Luis",
        secondname: "Suarez",
        email: "suarez@gmail.com",
        createdAt: new Date("2024-05-02T00:00:00.000Z"),
        phone: 654789321,
        address: "Plaza Principal 789"
    },
    {
        id: 4,
        firstname: "Toni",
        secondname: "Kroos",
        email: "kroos@gmail.com",
        createdAt: new Date("2024-05-02T00:00:00.000Z"),
        phone: 321987654,
        address: "Calle Secundaria 101"
    },
    {
        id: 5,
        firstname: "Karim",
        secondname: "Benzema",
        email: "benzema@gmail.com",
        createdAt: new Date("2024-05-02T00:00:00.000Z"),
        phone: 456123789,
        address: "Avenida Secundaria 202"
    },
    {
        id: 6,
        firstname: "Luka",
        secondname: "Modric",
        email: "modric@gmail.com",
        createdAt: new Date("2024-05-02T00:00:00.000Z"),
        phone: 789654123,
        address: "Calle Terciaria 303"
    },
    {
        id: 8,
        firstname: "Viniciussss",
        secondname: "Jr",
        email: "vinicius@gmail.com",
        createdAt: new Date("2024-05-02T00:00:00.000Z"),
        phone: 159753852,
        address: "Avenida Terciaria 404"
    },
    {
        id: 9,
        firstname: "rrr",
        secondname: "jfjjfjjf",
        email: "rodri@mail.com",
        createdAt: new Date("2024-05-03T04:18:44.082Z"),
        phone: 78125383,
        address: "12gh j"
    }
    ];

    service.getUsers().subscribe(students => {
      expect(students).toEqual(mockStudents);
    });

    const request = httpMock.expectOne(environment.baseAPIURL + '/students');
    expect(request.request.method).toBe('GET');
    request.flush(mockStudents);
  });

  it('Deberia obtener el estudiante asociado al id 1', () => {
    const mockStudent = {
      id: 1,
      firstname: "Cristiano",
      secondname: "Ronaldo",
      email: "cristiano@gmail.com",
      createdAt: new Date("2024-05-02T00:00:00.000Z"),
      phone: 123456789,
      address: "Calle Principal 123"
    };

    const studentId = 1;

    service.getStudentById(studentId).subscribe(student => {
      expect(student).toEqual(mockStudent);
    });

    const request = httpMock.expectOne(`${environment.baseAPIURL}/students/${studentId}`);
    expect(request.request.method).toBe('GET');
    request.flush(mockStudent);
  });

  it('Creamos un estudiante valido', () => {
    const mockStudent : CreateStudentPayload= {
      firstname: "New",
      secondname: "Student",
      email: "newstudent@gmail.com",
      createdAt: new Date(),
      phone: 987654321,
      address: "New Street"
    };

    const mockIStudent : IStudent= {
      id : 10,
      firstname: "New",
      secondname: "Student",
      email: "newstudent@gmail.com",
      createdAt: new Date(),
      phone: 987654321,
      address: "New Street"
    };

    service.createUser(mockStudent).subscribe(student => {
      console.log(student);
      expect(student.firstname).toEqual(mockIStudent.firstname);
      expect(student.secondname).toEqual(mockIStudent.secondname);
      expect(student.email).toEqual(mockIStudent.email);
      expect(student.phone).toEqual(mockIStudent.phone);
      expect(student.address).toEqual(mockIStudent.address);
      expect(student.createdAt).toEqual(mockIStudent.createdAt);
    });

    const request = httpMock.expectOne(`${environment.baseAPIURL}/students`);
    expect(request.request.method).toBe('POST');
    request.flush(mockStudent);
  });

  it('Se elimina un estudiante mediante el metodo DELETE', () => {
    const studentId = 1;

    service.deleteStudent(studentId).subscribe(() => {
      expect().nothing();
    });

    const request = httpMock.expectOne(`${environment.baseAPIURL}/students/${studentId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush({});
  });

  it('Actualizamos datos de un estudiante a traves del metodo UPDATE, indicando su Id en la URL', () => {
    const updatedStudentData: CreateStudentPayload = {
      firstname: "Updated",
      secondname: "Student",
      email: "updatedstudent@gmail.com",
      phone: 123456789,
      address: "Updated Street",
      createdAt: new Date(),
    };

    const updatedIStudentData: IStudent = {
      id: 1,
      firstname: "Updated",
      secondname: "Student",
      email: "updatedstudent@gmail.com",
      phone: 123456789,
      address: "Updated Street",
      createdAt: new Date(),
    };
    const studentId = 1;

    service.updateStudent(studentId, updatedStudentData).subscribe(updatedStudent => {
      expect(updatedStudent).toEqual(updatedIStudentData);
    });

    const request = httpMock.expectOne(`${environment.baseAPIURL}/students/${studentId}`);
    expect(request.request.method).toBe('PUT');
    request.flush({ id: studentId, ...updatedStudentData });
  });
});

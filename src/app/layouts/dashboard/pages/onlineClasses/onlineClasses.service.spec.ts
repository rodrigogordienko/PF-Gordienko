import { TestBed } from '@angular/core/testing';

import { OnlineClassesService } from './onlineClasses.service';

describe('StudentsService', () => {
  let service: OnlineClassesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineClassesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

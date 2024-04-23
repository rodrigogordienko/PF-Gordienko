import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineClassesComponent } from './onlineClasses.component';

describe('OnlineClassesComponent', () => {
  let component: OnlineClassesComponent;
  let fixture: ComponentFixture<OnlineClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnlineClassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnlineClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

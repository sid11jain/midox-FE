import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingEmployeeComponent } from './outstanding-employee.component';

describe('OutstandingEmployeeComponent', () => {
  let component: OutstandingEmployeeComponent;
  let fixture: ComponentFixture<OutstandingEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandingEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutstandingEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

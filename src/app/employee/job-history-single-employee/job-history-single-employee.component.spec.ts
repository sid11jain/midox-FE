import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobHistorySingleEmployeeComponent } from './job-history-single-employee.component';

describe('JobHistorySingleEmployeeComponent', () => {
  let component: JobHistorySingleEmployeeComponent;
  let fixture: ComponentFixture<JobHistorySingleEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobHistorySingleEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobHistorySingleEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

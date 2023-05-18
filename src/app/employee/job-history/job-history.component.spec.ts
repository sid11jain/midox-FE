import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobHistoryComponent } from './job-history.component';

describe('JobHistoryComponent', () => {
  let component: JobHistoryComponent;
  let fixture: ComponentFixture<JobHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobHistoryComponent]
    });
    fixture = TestBed.createComponent(JobHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

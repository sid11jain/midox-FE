import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayEmployeeComponent } from './pay-employee.component';

describe('PayEmployeeComponent', () => {
  let component: PayEmployeeComponent;
  let fixture: ComponentFixture<PayEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

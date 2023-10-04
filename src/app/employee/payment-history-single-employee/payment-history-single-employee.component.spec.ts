import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistorySingleEmployeeComponent } from './payment-history-single-employee.component';

describe('PaymentHistorySingleEmployeeComponent', () => {
  let component: PaymentHistorySingleEmployeeComponent;
  let fixture: ComponentFixture<PaymentHistorySingleEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentHistorySingleEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentHistorySingleEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

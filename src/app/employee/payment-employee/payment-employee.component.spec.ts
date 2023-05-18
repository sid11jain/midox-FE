import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEmployeeComponent } from './payment-employee.component';

describe('PaymentEmployeeComponent', () => {
  let component: PaymentEmployeeComponent;
  let fixture: ComponentFixture<PaymentEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentEmployeeComponent]
    });
    fixture = TestBed.createComponent(PaymentEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

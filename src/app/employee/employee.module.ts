import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { JobHistoryComponent } from './job-history/job-history.component';
import { PaymentEmployeeComponent } from './payment-employee/payment-employee.component';
import { SharedModule } from '../shared/shared/shared.module';
import { PaymentHistorySingleEmployeeComponent } from './payment-history-single-employee/payment-history-single-employee.component';
import { PayEmployeeComponent } from './pay-employee/pay-employee.component';
import { JobHistorySingleEmployeeComponent } from './job-history-single-employee/job-history-single-employee.component';
import { OutstandingEmployeeComponent } from './outstanding-employee/outstanding-employee.component';
import { AddEmployeeRolesComponent } from './add-employee/add-employee-roles/add-employee-roles.component'; 

@NgModule({
  declarations: [
    AddEmployeeComponent,
    ViewEmployeeComponent,
    JobHistoryComponent,
    PaymentEmployeeComponent,
    PaymentHistorySingleEmployeeComponent,
    PayEmployeeComponent,
    JobHistorySingleEmployeeComponent,
    OutstandingEmployeeComponent,
    AddEmployeeRolesComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }

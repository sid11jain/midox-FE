import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { JobHistoryComponent } from './job-history/job-history.component';
import { PaymentEmployeeComponent } from './payment-employee/payment-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { PaymentHistorySingleEmployeeComponent } from './payment-history-single-employee/payment-history-single-employee.component';
import { JobHistorySingleEmployeeComponent } from './job-history-single-employee/job-history-single-employee.component';

const routes: Routes = [
  {path: '', redirectTo: 'add-employee', pathMatch: 'full'},
  { path: 'add-employee', component:  AddEmployeeComponent}, 
  { path: 'job-history', component:  JobHistoryComponent},
  { path: 'job-history-employee/:employeeId', component:  JobHistorySingleEmployeeComponent},
  { path: 'payment-history', component:  PaymentEmployeeComponent},
  { path: 'payment-history-employee/:employeeId', component:  PaymentHistorySingleEmployeeComponent},
  { path: 'outstanding', component:  ViewEmployeeComponent}
  // { path: 'view-employee', component:  ViewEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

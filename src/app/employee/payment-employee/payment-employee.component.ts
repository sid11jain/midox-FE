import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-payment-employee',
  templateUrl: './payment-employee.component.html',
  styleUrls: ['./payment-employee.component.scss']
})
export class PaymentEmployeeComponent {
  showSpinner:boolean = true;
  employeePaymentHistory: any = [];
  constructor(private commonService: CommonService){ 
    // commonService.employeePaymentData.subscribe((val:any) => {
    //   this.employeePaymentDetails = val;
    //   console.log(this.employeePaymentDetails);
      
    // });
  }

  async ngOnInit(){
    this.showSpinner = true; 
    this.employeePaymentHistory = await this.commonService.getDataFn1({}, "employee", "pay-history");
    this.showSpinner = false 
  }
}

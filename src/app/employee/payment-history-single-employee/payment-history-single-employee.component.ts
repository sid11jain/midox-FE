import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-history-single-employee',
  templateUrl: './payment-history-single-employee.component.html',
  styleUrls: ['./payment-history-single-employee.component.scss']
})
export class PaymentHistorySingleEmployeeComponent {

  showSpinner:boolean = true
  employeePaymentHistory:any;
  employeePersonalDetails:any;
  employeeId:any;

  constructor(private commonService: CommonService, private route: ActivatedRoute){ }

  async ngOnInit(){
    this.showSpinner = true;     
    await this.route.params.subscribe(async (params) => {
      this.employeeId = params['employeeId'];
      this.employeePersonalDetails = await this.commonService.getBundleSearchFn("employee/get", this.employeeId)
      this.employeePaymentHistory = await this.commonService.getDataFn1({"employeeId":this.employeeId}, "employee", "pay-history");
      this.showSpinner = false 
    })
  }
}

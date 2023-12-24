import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {
  showSpinner:boolean = true;
  employeeOutstandingData:any;
  employeeDataForPayment:any;


  constructor(private commonService: CommonService){  }

  async ngOnInit(){
    this.showSpinner = true; 
    this.employeeOutstandingData = await this.commonService.getDataFn1({}, "employee", "outstandings");

    // let obj = {
    //   "employeeId":6,
    //  "paymentMode": "PAY_CASH",
    //  "paidBy" : 5,
    //  "paymentDate":"2023-10-03",
    //  "amountPaid" : 1,
    //  "details" : "Add some remarks"
    // }
    // let temp1 = await this.commonService.getDataFn1(obj, "employee", "pay");
    // localhost:8080/midoxapp/employee/pay
    
    // let obj1 = {
    //   "employeeId":19
    // }
    // let temp = await this.commonService.getDataFn1({}, "employee", "pay-history");
    // let temp = await this.commonService.getDataFn1(obj1, "employee", "pay-history");
    // localhost:8080/midoxapp/employee/pay-history
    // this.commonService.getBundleSearchFn("employee/get", '6')
    this.showSpinner = false 
  }

  // sendViewEmployeedata(data:any){
  //   this.commonService.employeeJobHistoryData.next(data);    
  // }

  getSelectedData(rowData:any) {
    // this.sendViewEmployeedata(rowData);
  }

  getRowDataForPay(rowData:any) {  
    this.employeeDataForPayment = rowData;
  }

  dataFromPayEmployee(data: any) {
    this.ngOnInit();    
  }
  

} 

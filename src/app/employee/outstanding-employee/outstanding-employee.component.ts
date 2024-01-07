import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-outstanding-employee',
  templateUrl: './outstanding-employee.component.html',
  styleUrls: ['./outstanding-employee.component.scss']
})
export class OutstandingEmployeeComponent {
  showSpinner:boolean = true;
  employeeOutstandingData:any;
  employeeDataForPayment:any;

  constructor(private commonService: CommonService){  }

  async ngOnInit(){
    this.showSpinner = true; 
    this.employeeOutstandingData = await this.commonService.getDataFn1({}, "employee", "outstandings");
    this.showSpinner = false; 
  }
  
  getRowDataForPay(rowData:any) {  
    this.employeeDataForPayment = rowData;
  }

  dataFromPayEmployee(data: any) {
    this.ngOnInit();    
  }
  
  //For export to excel button
  onExporting(e:any){
    let fileName = "Outstanding Employee";
    this.commonService.onExportingData(e,fileName);
  }
}

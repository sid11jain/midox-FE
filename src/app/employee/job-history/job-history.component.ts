import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.component.html',
  styleUrls: ['./job-history.component.scss']
})
export class JobHistoryComponent {
  showSpinner:boolean = true;
  allEmployeesJobHistoryDetails: any = [];
  constructor(private commonService: CommonService){ 
    // commonService.employeeJobHistoryData.subscribe((val:any) => {
    //   this.employeeJobHistoryDetails = val;
    //   console.log(this.employeeJobHistoryDetails);      
    // });
  }
 
  async ngOnInit(){
    this.showSpinner = true; 
    this.allEmployeesJobHistoryDetails = await this.commonService.getDataFn1({}, "job", "history");
    this.showSpinner = false;
  }

  //For export to excel button
  onExporting(e:any){
    let fileName = "Job History";
    this.commonService.onExportingData(e,fileName);
  }

  // sendJobHistoryEmployeeData(data:any){
  //   this.commonService.employeePaymentData.next(data);    
  // }

  // getSelectedData(rowData:any) {
  //   console.log("rowData ", rowData);   
  //   // this.sendJobHistoryEmployeeData(rowData);
  // }
 
}

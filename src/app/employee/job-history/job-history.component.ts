import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.component.html',
  styleUrls: ['./job-history.component.scss']
})
export class JobHistoryComponent {
  showSpinner:boolean = true;
  employeeJobHistoryDetails: any = [];
  constructor(private commonService: CommonService){ 
    commonService.employeeJobHistoryData.subscribe((val:any) => {
      this.employeeJobHistoryDetails = val;
      console.log(this.employeeJobHistoryDetails);
      
    });
  }

  ngOnInit(){
    setTimeout(() => {
      this.showSpinner = false 
    }, 1000);
  }

  sendJobHistoryEmployeeData(data:any){
    this.commonService.employeePaymentData.next(data);    
  }

  getSelectedData(rowData:any) {
    console.log("rowData ", rowData);   
    this.sendJobHistoryEmployeeData(rowData);
  }

  employeeDetails:any = {
    unique_id: "165",
    employeeName: "Bilal",
    jobPending: 25,
    paid: 5000,
    paymentDue: 2000,
    dobEmployee: "2023-06-01",
    employeeAdhaar: "123456781199",
    gender: "Male",
    employeeAddress: "Abc House, abc city, dex state, India 452101",
    employeeMobile: "1234456789",
    
  }

  
  jobHitoryEmployeeData: any = [
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "166",
      job: "J-4005",
      bundle: "B-1001",
      jobName: "Zuki",
      wageToProvide: 500,
      status: "Pending"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
    {
      unique_id: "165",
      job: "J-101",
      bundle: "B-1001",
      jobName: "L-Folding",
      wageToProvide: 300,
      status: "Completed"
    },
  ]
 
}

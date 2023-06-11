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

}

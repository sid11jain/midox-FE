import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-history-single-employee',
  templateUrl: './job-history-single-employee.component.html',
  styleUrls: ['./job-history-single-employee.component.scss']
})
export class JobHistorySingleEmployeeComponent {
  showSpinner:boolean = true;
  employeeJobHistory: any = [];
  employeePersonalDetails:any;
  employeeId:any;
  constructor(private commonService: CommonService, private route: ActivatedRoute){ 
  }

  async ngOnInit(){
    this.showSpinner = true; 
    // this.employeeJobHistory = await this.commonService.getDataFn1({}, "job", "history");
    // this.showSpinner = false;

    await this.route.params.subscribe(async (params) => {
      this.employeeId = params['employeeId'];
      this.employeePersonalDetails = await this.commonService.getBundleSearchFn("employee/get", this.employeeId)
      this.employeeJobHistory = await this.commonService.getDataFn1({"employeeId":this.employeeId}, "job", "history");
      this.showSpinner = false;
    })
  }
}

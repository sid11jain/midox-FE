import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adda-bundle',
  templateUrl: './adda-bundle.component.html',
  styleUrls: ['./adda-bundle.component.scss']
})
export class AddaBundleComponent {
  showSpinner:boolean = true;
  bundleAddaData:any;  
  employeeData:any = [];

  constructor(private commonService: CommonService, private route: ActivatedRoute){  }

  async ngOnInit(){    
    await this.route.params.subscribe(async (params) => { 
      const patternId = params['patternId'];
      console.log('Received ID:', patternId);
      this.bundleAddaData = await this.commonService.getDataFn1({"patternId":patternId}, "bundle", "get-bundles");
      this.employeeData = await this.commonService.getDataFn1({}, "employee", "get-employees");
      this.showSpinner = false;      
      
          
    });
    
  }
}

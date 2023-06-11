import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent {
  showSpinner:boolean = true;
  addMaterialDetails: any = [];
  constructor(private commonService: CommonService){ 
    commonService.addMaterialData.subscribe((val:any) => {
      this.addMaterialDetails = val;
      console.log(this.addMaterialDetails);
      
    });
  }
}

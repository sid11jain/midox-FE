import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-adda',
  templateUrl: './details-adda.component.html',
  styleUrls: ['./details-adda.component.scss']
})

export class DetailsAddaComponent {
  showSpinner:boolean = true;
  detailAddaData:any;
  addaPatternsData:any;
  addaMaterialData:any;
  
  constructor(private commonService: CommonService, private route: ActivatedRoute){  }

  async ngOnInit(){    
    await this.route.params.subscribe(async (params) => {
      const addaId = params['addaId'];
      console.log('Received ID:', addaId);
      this.detailAddaData = await this.commonService.getDataFn1({"addaId":addaId}, "adda", "get-addas");
      
      this.addaMaterialData = [...this.detailAddaData[0].addaMaterials];
      this.addaPatternsData = [...this.detailAddaData[0].addaPatterns];
      console.log("addaMaterialData ",this.addaMaterialData);
      console.log("addaPatternsData ",this.addaPatternsData);
      this.showSpinner = false;      
    });
    
  }

  addMaterialFn(){
    console.log("addMaterialFn called");    
  }

  addPaternFn(){
    console.log("addPaternFn called");    
  }

}

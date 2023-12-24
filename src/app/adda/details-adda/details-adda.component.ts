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
  // brandId:any;
  addaId:any;
  
  dialogTitle:string = "Adda";
  editAddaMaterialData:any = "";
  editAddaPatternData:any = "";
  
  constructor(private commonService: CommonService, private route: ActivatedRoute){  }

  async ngOnInit(){    
    await this.route.params.subscribe(async (params) => {
      this.addaId = params['addaId'];
      this.detailAddaData = await this.commonService.getDataFn1({"addaId":this.addaId}, "adda", "get-addas");
      // this.brandId = this.detailAddaData[0].brandDetails.brandId;
      this.addaMaterialData = [...this.detailAddaData[0].addaMaterials];
      this.addaPatternsData = [...this.detailAddaData[0].addaPatterns];
      this.showSpinner = false;      
    });
    
  }

  
  getSelectedData(rowData:any) {
    this.editAddaMaterialData = rowData?.data;

  }

  getSelectedData1(rowData:any) {
    this.editAddaPatternData = rowData?.data;

  }
  
  async deleteMaterial(data1: any){  
    this.showSpinner = true; 
    let temp = await this.commonService.deleteDataFn1({"addaMaterialId": data1.addaMaterialId}, "adda", "delete-material", this.dialogTitle);

    if(temp){
      this.ngOnInit();
    }
    else{
      this.showSpinner = false;      
    }    
  }

  async deletePattern(data2: any){  
    this.showSpinner = true; 
    let temp = await this.commonService.deleteDataFn1({"patternId": data2.patternId}, "adda", "delete-pattern", this.dialogTitle);
  
    if(temp){
      this.ngOnInit();
    }
    else{
      this.showSpinner = false;      
    }
  }


  
  dataFromAddaMaterial(data: any) {
    this.showSpinner = true;
    this.ngOnInit();    
  }

  dataFromAddaPattern(data: any) {
    this.showSpinner = true;
    this.ngOnInit();    
  }


}

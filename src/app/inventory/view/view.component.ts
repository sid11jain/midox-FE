import { Component, OnInit} from '@angular/core';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  showSpinner:boolean = false;
  viewClothData!: any[];
  supplierData!:any[];
  materialData!:any[];
  colorFabricCodeData!:any[];
  measurementTypeData!:any[];
  subCategoryClothData!:any[];
  subCategoryAccessoryData!:any[];
  myInterval:any;
  countApi:number = 0;
  constructor(private commonService: CommonService){  }

  ngOnInit(){
    this.getAllSettingData();
    this.myInterval = setInterval(()=>{
      if(this.countApi == 4){
        clearInterval(this.myInterval);   
        this.getStocks();
      }
    }, 1000);
    
  }

  getAllSettingData(){
    this.showSpinner = true;
    this.commonService.getAllSettingsData("MID_MAT").subscribe((responseData)=>{
      this.countApi += 1;
      let response = responseData.body;
      if (responseData.status === 200) {
        this.materialData = response;
      }
    });
    this.commonService.getAllSettingsData("MID_SUB").subscribe((responseData)=>{
      this.countApi += 1;
      let response = responseData.body;
      if (responseData.status === 200) {
        this.subCategoryAccessoryData = response?.filter((x:any)=>x.parentEntityCd == "MAT_ACC");
        this.subCategoryClothData = response?.filter((x:any)=>x.parentEntityCd == "MAT_CLOTH");
      }
    });
    this.commonService.getAllSettingsData("MID_CFC").subscribe((responseData)=>{
      this.countApi += 1;
      let response = responseData.body;
      if (responseData.status === 200) {
        this.colorFabricCodeData = response;
      }
    });
    this.commonService.getAllSettingsData("MID_UNIT").subscribe((responseData)=>{
      this.countApi += 1;
      let response = responseData.body;
      if (responseData.status === 200) {
        this.measurementTypeData = response;
      }
    });
  }

  getStocks(){
    this.commonService.getAllStocks()
    .subscribe((response:any) => {
      this.showSpinner = false;
      if (response.status === 200) {
        let dataList:any = response.body;
        if(dataList?.length > 0){
          this.viewClothData = dataList.map((item:any)=> {
            
            item.material = this.materialData.find((x:any) => x.entityCd == item.materialCd)?.displayValue;
            item.colorfabric = this.colorFabricCodeData.find((x:any) => x.entityCd == item.colorFabricCd)?.displayValue;
            item.subcategory = ((dataList) as any).materialCd == "MAT_ACC" ? this.subCategoryAccessoryData.find((x:any) => x.entityCd == item.subcategoryCd)?.displayValue : this.subCategoryClothData.find((x:any) => x.entityCd == item.subcategoryCd)?.displayValue;
            item.unitname = this.measurementTypeData.find((x:any) => x.entityCd == item.unit)?.displayValue;

            return item;
          })
        }
        
        // this.viewClothData = dataList.filter((x:any) => x.materialCd == "MAT_CLOTH");

        // this.viewAccesoriesData = dataList.filter((x:any) => x.materialCd == "MAT_ACC");;
      }
    });
  }

  sendDtockHistoryData(data:any){
    this.commonService.stockHistoryData.next(data); 
  }

  getSelectedData(rowData:any) {      
    this.sendDtockHistoryData(rowData);
  }

    viewAccesoriesData: any = [
      //       {
      //   unique_id:"143",
      //   accessories:"Dhaga",
      //   amount:40000,
      //   avl_amount:7532,
      // },
  ];

  //For export to excel button
  onExporting(e:any){
    let fileName = "View Stock";
    this.commonService.onExportingData(e,fileName);
  }
  

}

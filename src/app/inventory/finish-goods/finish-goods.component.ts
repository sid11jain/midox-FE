import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-finish-goods',
  templateUrl: './finish-goods.component.html',
  styleUrls: ['./finish-goods.component.scss']
})
export class FinishGoodsComponent {
  showSpinner:boolean = true;
  selectedRowsData:any = [];
  finishGoodApiData:any;
  dataForDispatch:any;

  // @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  //(click)="sendDispatchData(grid.instance.getSelectedRowsData())"
  constructor(private commonService: CommonService){

  }
  async ngOnInit(){
    this.showSpinner = true;
    this.finishGoodApiData = await this.commonService.getDataFn1({}, "finished-goods", "get-goods");
    this.showSpinner = false;
  }

  getRowDataForPay(rowData:any) {  
    this.dataForDispatch = rowData;
  }

  dataFromDispatch(data: any) {
    this.ngOnInit();    
  }
}

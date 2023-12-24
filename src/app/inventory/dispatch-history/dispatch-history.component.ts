import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dispatch-history',
  templateUrl: './dispatch-history.component.html',
  styleUrls: ['./dispatch-history.component.scss']
})
export class DispatchHistoryComponent {
  showSpinner:boolean = true;
  // disptachDetails: any = [];
  disptachHistory: any;
  constructor(private commonService: CommonService, private route: ActivatedRoute){
  }

  async ngOnInit(){
    this.showSpinner = true;
    
    await this.route.params.subscribe(async (params) => {
      let finishedGoodsId = params['finishedGoodsId'];
      if(finishedGoodsId){     
        this.disptachHistory = await this.commonService.getDataFn1({"finishedGoodsId":finishedGoodsId}, "finished-goods", "get-dispatches");
      }
      else{
        this.disptachHistory = await this.commonService.getDataFn1({}, "finished-goods", "get-dispatches");
      }
      this.showSpinner = false;
    })
  }
}

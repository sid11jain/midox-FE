import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adda-bundle',
  templateUrl: './adda-bundle.component.html',
  styleUrls: ['./adda-bundle.component.scss']
})
export class AddaBundleComponent {
  showSpinner: boolean = true;
  bundleAddaData!: any[];
  processData: any = [];
  detailAddaData: any;

  bundleDetailObj:any = {};

  constructor(private commonService: CommonService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.showSpinner = true;
    await this.route.params.subscribe(async (params) => {
      const patternId = params['patternId'];
      const brandId = params['brandId'];
      const addaId = params['addaId'];
      // console.log('Received ID:', patternId);
      this.bundleDetailObj = { "patternId": patternId }
      this.detailAddaData = await this.commonService.getDataFn1({ "addaId": addaId }, "adda", "get-addas");
      this.bundleAddaData = await this.commonService.getDataFn1({ "patternId": patternId }, "bundle", "get-bundles");
      this.processData = await this.commonService.getDataFn1({ "brandId": brandId }, "design", "get-designs");
      this.processData = this.processData[0].processes;
      console.log("processData ", this.processData);

      this.showSpinner = false;
    });
  } 

}

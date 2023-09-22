import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { MsgDialogComponent } from 'src/app/shared/msg-dialog/msg-dialog.component';

@Component({
  selector: 'app-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.scss']
})
export class BundleComponent {
  // constructor(public dialog: MatDialog) {}
  
  constructor(private commonService: CommonService) { }

  async ngOnInit(){
    
    // this.bundleAddaData = await this.commonService.getDataFn1({ "patternId": patternId }, "bundle", "get-bundles");
    // let temp = await this.commonService.getDataFn1({ "addaId": 3 }, "bundle", "get-bundles");
    // console.log(temp);
    
  }

  // openDialog() {
  //   this.dialog.open(MsgDialogComponent, {
  //     data: {
  //       title: 'Data',
  //       message: 'saved successfully!',
  //     },
  //     width: '30%',
  //     height: '30%',
  //     panelClass: 'msg-dialog'
  //   });
  // }
}

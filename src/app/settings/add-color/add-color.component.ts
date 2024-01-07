import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { MsgDialogComponent } from 'src/app/shared/msg-dialog/msg-dialog.component';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.scss']
})
export class AddColorComponent {
  colorForm!: FormGroup;
  // processData: any[] = [];
  colorArray: any[] = [];
  editedColorIndex: number | null = null;
  deleteBtnDisabled: boolean = false;
  showSpinner: boolean = true;
  
  key: string = "MID_COL";
  dialogTitle: string = "Color";
  dialogMessage!: string;   
  editObject:any = {};

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.colorForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  async ngOnInit(){
    // this.getColor();     
    this.colorArray = await this.common.getDataFn(this.key);
    this.showSpinner = false;
  }
  
  async onSubmit() {
    if (this.colorForm.invalid) {
      return;
    }    
    this.showSpinner = true;
    
    this.deleteBtnDisabled = false;
    let inputVal = this.colorForm.value.name;
    if(this.editedColorIndex !== null){
      //For update
      let obj = {    
        "entityCd": "UNIT_KG8",
        "parentEntityCd": null,
        "masterCd": "MID_COL",
        "displayValue": "Kg8",
        "entityId": 0
      }
      obj.entityCd = this.editObject?.entityCd;
      obj.entityId = this.editObject?.entityId;
      obj.displayValue = inputVal;
      
      // this.editColor(obj);      
      this.colorArray = await this.common.editDataFn(obj,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    else{
      // let currTime = Date.now();
      let obj = {    
        "parentEntityCd": null,
        "masterCd": "MID_COL",
        "displayValue": "Kg8"
      }
      // obj.entityCd = "COL_"+currTime;
      obj.displayValue = inputVal;
      let data = [obj]   

      // this.addColor(data);
      
      // Post API call
      this.colorArray = await this.common.addDataFn(data,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    // this.showSpinner = true;
    
    this.editedColorIndex = null;
    this.colorForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editObject = data;
    this.editedColorIndex = index;
    this.colorForm.patchValue({
      name: data.displayValue
    });
  }

  async delete(apiData: any) {    
    this.showSpinner = true; 
    let entityCd = apiData?.entityCd;
    // this.deleteColor(entityCd);
    
    // Delete API call
    this.colorArray = await this.common.deleteDataFn(entityCd,this.dialogTitle,this.key);
    this.showSpinner = false;
  }
}

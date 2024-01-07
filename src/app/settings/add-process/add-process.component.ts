import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { MsgDialogComponent } from 'src/app/shared/msg-dialog/msg-dialog.component';

@Component({
  selector: 'app-add-process',
  templateUrl: './add-process.component.html',
  styleUrls: ['./add-process.component.scss']
})
export class AddProcessComponent {

  processForm: FormGroup;
  processData: any[] = [];
  processArray: any[] = [];
  editedProcessIndex: number | null = null;
  deleteBtnDisabled: boolean = false;
  showSpinner: boolean = true;
  
  dialogTitle: string = "Process";
  key: string = "MID_PROC";
  dialogMessage!: string;   
  editObject:any = {};

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.processForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  async ngOnInit(){
    // this.getProcess(); 
     
    this.processArray = await this.common.getDataFn(this.key);
    this.showSpinner = false;
  }
  
  async onSubmit() {
    if (this.processForm.invalid) {
      return;
    }    
    this.showSpinner = true;
    this.deleteBtnDisabled = false;
    let inputVal = this.processForm.value.name;
    if(this.editedProcessIndex !== null){
      //For update
      let obj = {    
        "entityCd": "UNIT_KG8",
        "parentEntityCd": null,
        "masterCd": "MID_PROC",
        "displayValue": "Kg8",
        "entityId": 0
      }
      obj.entityCd = this.editObject?.entityCd;
      obj.entityId = this.editObject?.entityId;
      obj.displayValue = inputVal;
      
      this.processArray = await this.common.editDataFn(obj,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    else{
      // let currTime = Date.now();
      let obj = {    
        "parentEntityCd": null,
        "masterCd": "MID_PROC",
        "displayValue": "Kg8"
      }
      // obj.entityCd = "PROC_"+currTime;
      obj.displayValue = inputVal;
      let data = [obj]    

      // this.addProcess(data);
      
      // Post API call
      this.processArray = await this.common.addDataFn(data,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    // this.showSpinner = true;
    
    this.editedProcessIndex = null;
    this.processForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editObject = data;
    this.editedProcessIndex = index;
    this.processForm.patchValue({
      name: data.displayValue
    });
  }

  async delete(apiData: any) {    
    this.showSpinner = true; 
    let entityCd = apiData?.entityCd;
    // this.deleteProcess(entityCd);
    
    // Delete API call
    this.processArray = await this.common.deleteDataFn(entityCd,this.dialogTitle,this.key);
    this.showSpinner = false;
  }

  }

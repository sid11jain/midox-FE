import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { MsgDialogComponent } from 'src/app/shared/msg-dialog/msg-dialog.component';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.scss']
})
export class AddMeasurementComponent {
  
  measurementTypeForm: FormGroup;
  measurementTypeData: any[] = [];
  measurementTypeArray: any[] = [];
  editedMeasurementTypeIndex: number | null = null;
  deleteBtnDisabled: boolean = false;
  showSpinner: boolean = true;
  editObject:any = {};
  
  dialogTitle: string = "Measurement Unit";
  dialogMessage!: string;
  key: string = "MID_UNIT";


  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.measurementTypeForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  async ngOnInit(){
    // this.getMeasrurementType();
     
    this.measurementTypeArray = await this.common.getDataFn(this.key);
    this.showSpinner = false;
  }

  async onSubmit() {
    if (this.measurementTypeForm.invalid) {
      return;
    }
    this.showSpinner = true;    
    this.deleteBtnDisabled = false;
    let inputVal = this.measurementTypeForm.value.name;
    if(this.editedMeasurementTypeIndex !== null){
      //For update
      let obj = {    
        "entityCd": "UNIT_KG8",
        "parentEntityCd": null,
        "masterCd": "MID_UNIT",
        "displayValue": "Kg8",
        "entityId": 0
      }
      obj.entityCd = this.editObject?.entityCd;
      obj.entityId = this.editObject?.entityId;
      obj.displayValue = inputVal;
      
      this.measurementTypeArray = await this.common.editDataFn(obj,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    else{
      // let currTime = Date.now();
      let obj = {    
        "parentEntityCd": null,
        "masterCd": "MID_UNIT",
        "displayValue": "Kg8"
      }
      // obj.entityCd = "UNIT_"+currTime;
      obj.displayValue = inputVal;
      let data = [obj]  

      // this.addMeasurementType(data);
      
      // Post API call
      this.measurementTypeArray = await this.common.addDataFn(data,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    // this.showSpinner = true;
    
    this.editedMeasurementTypeIndex = null;
    this.measurementTypeForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editObject = data;
    this.editedMeasurementTypeIndex = index;
    this.measurementTypeForm.patchValue({
      name: data.displayValue
    });
  }

  async delete(apiData: any) {
    // this.measurementTypeData.splice(index, 1);
      this.showSpinner = true; 
    let entityCd = apiData?.entityCd;
    // this.deleteMeasurementType(entityCd);
    
    // Delete API call
    this.measurementTypeArray = await this.common.deleteDataFn(entityCd,this.dialogTitle,this.key);
    this.showSpinner = false;
  }

  }

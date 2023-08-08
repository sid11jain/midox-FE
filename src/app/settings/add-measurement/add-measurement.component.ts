import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

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

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.measurementTypeForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(){
    // this.getMeasrurementType();
    this.deleteMeasurementType("UNIT_KG1");
  }

  onSubmit() {
    if (this.measurementTypeForm.invalid) {
      return;
    }
    
    this.deleteBtnDisabled = false;
    let inputVal = this.measurementTypeForm.value.name;
    console.log("inputVal ", inputVal);
    if(this.editedMeasurementTypeIndex !== null){
      //For update
      console.log("Update");
      console.log("editObject ", this.editObject);
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
      // console.log("Obj ", obj);
      
      this.editMeasurementType(obj);
    }
    else{
      let currTime = Date.now();
      let obj = {    
        "entityCd": "UNIT_KG8",
        "parentEntityCd": null,
        "masterCd": "MID_UNIT",
        "displayValue": "Kg8"
      }
      obj.entityCd = "UNIT_"+currTime;
      obj.displayValue = inputVal;
      let data = [obj]
      console.log(data);    

      this.addMeasurementType(data);
    }
    this.showSpinner = true;
    
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

  delete(index: number) {
    this.measurementTypeData.splice(index, 1);
  }

  //API Call
  getMeasrurementType(){    
    this.common.getAllSettingsData("MID_UNIT").subscribe((responseData:any)=>{
      let response = responseData?.body;
      if (responseData.status === 200) {
        this.measurementTypeArray = response;
        console.log(response);    
      }
      else{
        console.log("Error code: ",responseData?.status);        
      }
      this.showSpinner = false;
    });
  }

  deleteMeasurementType(entityCd:any){
    console.log("API Call");    
    this.common.deleteAllSettingsData(entityCd).subscribe((responseData:any)=>{
      // let response = responseData?.body;
      console.log(responseData);        
      if (responseData.status === 200) {
        // this.materials = response;
        // console.log(response);        
      }
      else{
        console.log("Error code: ",responseData?.status);        
      }
      // this.showSpinner = false;
    });
  }

  addMeasurementType(data:any){
    console.log("Post API Call");
    this.common.addAllSettingsData(data).subscribe((responseData:any)=>{
      let response = responseData?.body;   
      if (responseData.status === 201) {
        console.log(response);       
        this.getMeasrurementType();     
      }
      else{
        console.log("Error code: ",responseData?.status);        
      }
      this.showSpinner = false;  
    });
  }

  editMeasurementType(data:any){
    console.log("Edit API Call");
    this.common.editAllSettingsData(data).subscribe((responseData:any)=>{
      let response = responseData?.body;   
      if (responseData.status === 200) {
        console.log(response);       
        this.getMeasrurementType();     
      }
      else{
        console.log("Error code: ",responseData?.status);        
      }
      this.showSpinner = false;  
    });
  }
}

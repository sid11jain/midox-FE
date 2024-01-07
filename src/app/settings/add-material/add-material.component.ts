import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { MsgDialogComponent } from 'src/app/shared/msg-dialog/msg-dialog.component';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent { 
  materialForm: FormGroup;
  materials: any = [];
  editedMaterialIndex: number | null = null;
  deleteBtnDisabled: boolean = false;
  showSpinner: boolean = true;
  
  key: string = "MID_MAT";
  dialogTitle: string = "Material";
  dialogMessage!: string;  
  editObject:any = {};

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.materialForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  async ngOnInit(){
    // this.getMaterial();    
    this.materials = await this.common.getDataFn(this.key);
    this.showSpinner = false;
  }

  async onSubmit() {
    if (this.materialForm.invalid) {
      return;
    }   
    this.showSpinner = true; 
    this.deleteBtnDisabled = false;
    let inputVal = this.materialForm.value.name;
    if(this.editedMaterialIndex !== null){
      //For update
      let obj = {    
        "entityCd": "",
        "parentEntityCd": null,
        "masterCd": "MID_MAT",
        "displayValue": "",
        "entityId": 0
      }
      obj.entityCd = this.editObject?.entityCd;
      obj.entityId = this.editObject?.entityId;
      obj.displayValue = inputVal;
      // this.editMaterial(obj); 
      this.materials = await this.common.editDataFn(obj,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    else{
      let obj = {    
        "parentEntityCd": null,
        "masterCd": "MID_MAT",
        "displayValue": ""
      }
      obj.displayValue = inputVal;
      let data = [obj]     

      // Post API call
      this.materials = await this.common.addDataFn(data,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    // this.showSpinner = true;    
    this.editedMaterialIndex = null;
    this.materialForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true; 
    this.editObject = data;
    this.editedMaterialIndex = index;
    this.materialForm.patchValue({
      name: data.displayValue
    });
  }

  async delete(apiData: any) {    
    this.showSpinner = true; 
    let entityCd = apiData?.entityCd;
    // this.deleteMaterial(entityCd);

    // Delete API call
    this.materials = await this.common.deleteDataFn(entityCd,this.dialogTitle,this.key);
    this.showSpinner = false;
  }  

}

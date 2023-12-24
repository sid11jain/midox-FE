import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-size',
  templateUrl: './add-size.component.html',
  styleUrls: ['./add-size.component.scss']
})
export class AddSizeComponent {

  materialForm: FormGroup;
  materials: any = [];
  editedMaterialIndex: number | null = null;
  deleteBtnDisabled: boolean = false;
  showSpinner: boolean = true;
  
  key: string = "MID_SIZE";
  dialogTitle: string = "Size";
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
        "masterCd": "MID_SIZE",
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
        "masterCd": "MID_SIZE",
        "displayValue": ""
      }
      obj.displayValue = inputVal;
      let data = [obj];  
      // this.addMaterial(data);     

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

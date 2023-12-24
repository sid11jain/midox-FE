import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent {

  subCategoryForm: FormGroup;
  subCategoryArray: any[] = [];
  editedSubCategoryIndex: number | null = null;
  deleteBtnDisabled: boolean = false;
  dropDownValue:any = [];
  showSpinner:boolean = true;
  showSpinnerTable:boolean = true;
  
  dialogTitle: string = "Sub Category";
  dialogMessage!: string;  
  editObject:any = {};
  key:string = "MID_SUB";
  key2:string = "MID_MAT";

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.subCategoryForm = this.formBuilder.group({
      material: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  async ngOnInit(){
    // this.getMaterial();
    
    this.dropDownValue = await this.common.getDataFn(this.key2);
    this.showSpinner = false;
    this.subCategoryArray = await this.common.getDataFn(this.key);
    // this.getSubCategory();    
    this.showSpinnerTable = false;
  }

  async onSubmit() {
    if (this.subCategoryForm.invalid) {
      return;
    }    
    this.showSpinner = true;
    const selectControl = this.subCategoryForm.get('material');
    selectControl?.enable();  
    
    this.deleteBtnDisabled = false;
    let inputVal = this.subCategoryForm?.value?.name;
    let materialVal = this.subCategoryForm?.value?.material;
    if(this.editedSubCategoryIndex !== null){
      //For update
      let obj = {    
        "entityCd": "UNIT_KG8",
        "parentEntityCd": null,
        "masterCd": "MID_SUB",
        "displayValue": "Kg8",
        "entityId": 0
      }
      obj.entityCd = this.editObject?.entityCd;
      obj.parentEntityCd = this.editObject?.parentEntityCd;
      obj.entityId = this.editObject?.entityId;
      obj.displayValue = inputVal;
      
      this.subCategoryArray = await this.common.editDataFn(obj,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    else{
      // let currTime = Date.now();
      let obj = {    
        "parentEntityCd": "",
        "masterCd": "MID_SUB",
        "displayValue": ""
      }
      // obj.entityCd = "SUB_"+currTime;
      obj.parentEntityCd = materialVal;
      obj.displayValue = inputVal;
      let data = [obj];   

      // this.addSubCategory(data);      
      // Post API call
      this.subCategoryArray = await this.common.addDataFn(data,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    // this.showSpinner = true;
    
    this.editedSubCategoryIndex = null;
    this.subCategoryForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editObject = data;
    this.editedSubCategoryIndex = index;
    this.subCategoryForm.patchValue({
      material: data.parentEntityCd,
      name: data.displayValue
    });
    
    const selectControl = this.subCategoryForm.get('material');
    selectControl?.disable();
  }

  async delete(apiData: any) {
    
    this.showSpinner = true; 
    let entityCd = apiData?.entityCd;
    // this.deleteSubCategory(entityCd);
    
    // Delete API call
    this.subCategoryArray = await this.common.deleteDataFn(entityCd,this.dialogTitle,this.key);
    this.showSpinner = false;
  }
}

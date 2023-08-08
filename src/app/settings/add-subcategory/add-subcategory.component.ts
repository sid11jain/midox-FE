import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { MsgDialogComponent } from 'src/app/shared/msg-dialog/msg-dialog.component';

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

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.subCategoryForm = this.formBuilder.group({
      material: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.getMaterial();
    this.getSubCategory();
  }

  onSubmit() {
    if (this.subCategoryForm.invalid) {
      return;
    }
    
    const selectControl = this.subCategoryForm.get('material');
    selectControl?.enable();
    console.log(this.subCategoryForm.value);    
    
    this.deleteBtnDisabled = false;
    let inputVal = this.subCategoryForm?.value?.name;
    let materialVal = this.subCategoryForm?.value?.material;
    console.log("inputVal ", inputVal);
    if(this.editedSubCategoryIndex !== null){
      //For update
      console.log("Update");
      console.log("editObject ", this.editObject);
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
      // console.log("Obj ", obj);
      
      this.editSubCategory(obj);
    }
    else{
      let currTime = Date.now();
      let obj = {    
        "entityCd": "",
        "parentEntityCd": "",
        "masterCd": "MID_SUB",
        "displayValue": ""
      }
      obj.entityCd = "SUB_"+currTime;
      obj.parentEntityCd = materialVal;
      obj.displayValue = inputVal;
      let data = [obj]
      console.log(data);    

      this.addSubCategory(data);
    }
    this.showSpinner = true;
    
    this.editedSubCategoryIndex = null;
    this.subCategoryForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editObject = data;
    this.editedSubCategoryIndex = index;
    this.subCategoryForm.patchValue({
      material: data.displayValue,
      name: data.displayValue
    });
    
    const selectControl = this.subCategoryForm.get('material');
    selectControl?.disable();
  }

  delete(apiData: any) {
    
    this.showSpinner = true; 
    let entityCd = apiData?.entityCd;
    this.deleteSubCategory(entityCd);
  }

  //API Call Get material
  getMaterial(){
    console.log("API Call");    
    this.common.getAllSettingsData("MID_MAT").subscribe((responseData:any)=>{
      let response = responseData?.body;
      if (responseData.status === 200) {
        this.dropDownValue = response;        
        console.log(response);        
      }
      else{
        console.log("Error code: ",responseData?.status);        
      }
      this.showSpinner = false;
    });
  }

  //API Call Get sub category
  getSubCategory(){
    console.log("API Call");    
    this.common.getAllSettingsData("MID_SUB").subscribe((responseData:any)=>{
      let response = responseData?.body;
      if (responseData.status === 200) {
        this.subCategoryArray = response;        
        console.log(response);        
      }
      else{
        console.log("Error code: ",responseData?.status);        
      }
      this.showSpinnerTable = false;
    });
  }

  
  // Delete
  deleteSubCategory(entityCd:any){
    console.log("API Call");    
    this.common.deleteAllSettingsData(entityCd).subscribe((responseData:any)=>{
      // let response = responseData?.body;
      console.log(responseData);        
      if (responseData.status === 200) {
        this.getSubCategory();
        this.dialogMessage = 'Sub Category delete successfully.'; 
      }
      else{
        console.log("Error code: ",responseData?.status); 
        this.dialogMessage = 'Sub Category failed to delete.';        
      }
      this.showSpinner = false; 
      this.openDialog();
    });
  }

  // Add
  addSubCategory(data:any){
    console.log("Post API Call");
    this.common.addAllSettingsData(data).subscribe((responseData:any)=>{
      let response = responseData?.body;   
      if (responseData.status === 201) {
        console.log(response);       
        this.getSubCategory();    
        
        this.dialogMessage = 'Sub Category saved successfully.'; 
      }
      else{
        console.log("Error code: ",responseData?.status);    
        this.dialogMessage = 'Sub Category failed to save.'; 
      }      
      this.showSpinner = false;  
      this.openDialog();
    });
  }

  // Edit
  editSubCategory(data:any){
    console.log("Edit API Call");
    this.common.editAllSettingsData(data).subscribe((responseData:any)=>{
      let response = responseData?.body;   
      if (responseData.status === 200) {
        console.log(response);       
        this.getSubCategory();   
        this.dialogMessage = 'Sub Category update successfully.'; 
      }
      else{
        console.log("Error code: ",responseData?.status); 
        this.dialogMessage = 'Sub Category failed to update.';        
      }
      this.showSpinner = false;  
      this.openDialog();
    });
  }

  //Modal 
  openDialog(): void {
    const dialogRef = this.dialog.open(MsgDialogComponent, {
      width: '400px',
      data: { title: this.dialogTitle, message: this.dialogMessage }
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }

}

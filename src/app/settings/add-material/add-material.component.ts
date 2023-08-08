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
  materials: any[] = [];
  editedMaterialIndex: number | null = null;
  deleteBtnDisabled: boolean = false;
  showSpinner: boolean = true;
  
  dialogTitle: string = "Material";
  dialogMessage!: string;  
  editObject:any = {};

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.materialForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.getMaterial();
  }

  // onSubmit() {
  //   if (this.materialForm.invalid) {
  //     return;
  //   }
  //   this.deleteBtnDisabled = false;
  //   const name = this.materialForm.controls['name'].value;
    
  //   if (this.editedMaterialIndex !== null) {
  //     this.materials[this.editedMaterialIndex].name = name;
  //     this.editedMaterialIndex = null;
  //   } else {
  //     const newMaterial = { name: name };
  //     this.materials.push(newMaterial);
  //   }
  //   this.materialForm.reset();
  // }

  onSubmit() {
    if (this.materialForm.invalid) {
      return;
    }
    
    this.deleteBtnDisabled = false;
    let inputVal = this.materialForm.value.name;
    console.log("inputVal ", inputVal);
    if(this.editedMaterialIndex !== null){
      //For update
      console.log("Update");
      console.log("editObject ", this.editObject);
      let obj = {    
        "entityCd": "UNIT_KG8",
        "parentEntityCd": null,
        "masterCd": "MID_PROD",
        "displayValue": "Kg8",
        "entityId": 0
      }
      obj.entityCd = this.editObject?.entityCd;
      obj.entityId = this.editObject?.entityId;
      obj.displayValue = inputVal;
      // console.log("Obj ", obj);
      
      this.editMaterial(obj);
    }
    else{
      let currTime = Date.now();
      let obj = {    
        "entityCd": "UNIT_KG8",
        "parentEntityCd": null,
        "masterCd": "MID_MAT",
        "displayValue": "Kg8"
      }
      obj.entityCd = "MAT_"+currTime;
      obj.displayValue = inputVal;
      let data = [obj]
      console.log(data);    

      this.addMaterial(data);
    }
    this.showSpinner = true;
    
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

  delete(apiData: any) {
    // this.materials.splice(index, 1);
    
    this.showSpinner = true; 
    let entityCd = apiData?.entityCd;
    this.deleteMaterial(entityCd);
  }  

  //API Call
  getMaterial(){
    console.log("API Call");
    
    this.common.getAllSettingsData("MID_MAT").subscribe((responseData:any)=>{
      let response = responseData?.body;
      if (responseData.status === 200) {
        this.materials = response;
        console.log(response);        
      }
      else{
        console.log("Error code: ",responseData?.status);        
      }
      this.showSpinner = false;
    });
  }
  
  // Delete
  deleteMaterial(entityCd:any){
    console.log("API Call");    
    this.common.deleteAllSettingsData(entityCd).subscribe((responseData:any)=>{
      // let response = responseData?.body;
      console.log(responseData);        
      if (responseData.status === 200) {
        this.getMaterial();
        this.dialogMessage = 'Material delete successfully.'; 
      }
      else{
        console.log("Error code: ",responseData?.status); 
        this.dialogMessage = 'Material failed to delete.';        
      }
      this.showSpinner = false; 
      this.openDialog();
    });
  }

  // Add
  addMaterial(data:any){
    console.log("Post API Call");
    this.common.addAllSettingsData(data).subscribe((responseData:any)=>{
      let response = responseData?.body;   
      if (responseData.status === 201) {
        console.log(response);       
        this.getMaterial();    
        
        this.dialogMessage = 'Material saved successfully.'; 
      }
      else{
        console.log("Error code: ",responseData?.status);    
        this.dialogMessage = 'Material failed to save.'; 
      }      
      this.showSpinner = false;  
      this.openDialog();
    });
  }

  // Edit
  editMaterial(data:any){
    console.log("Edit API Call");
    this.common.editAllSettingsData(data).subscribe((responseData:any)=>{
      let response = responseData?.body;   
      if (responseData.status === 200) {
        console.log(response);       
        this.getMaterial();   
        this.dialogMessage = 'Material update successfully.'; 
      }
      else{
        console.log("Error code: ",responseData?.status); 
        this.dialogMessage = 'Material failed to update.';        
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

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

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.materialForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.getMaterial();
  }

  onSubmit() {
    if (this.materialForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const name = this.materialForm.controls['name'].value;
    
    if (this.editedMaterialIndex !== null) {
      this.materials[this.editedMaterialIndex].name = name;
      this.editedMaterialIndex = null;
    } else {
      const newMaterial = { name: name };
      this.materials.push(newMaterial);
    }
    this.materialForm.reset();
  }

  editMaterial(material: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedMaterialIndex = index;
    this.materialForm.patchValue({
      name: material.displayValue
    });
  }

  deleteMaterial(index: number) {
    this.materials.splice(index, 1);
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
}

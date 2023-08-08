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
  subCategoryData: any[] = [];
  subCategoryArray: any[] = [];
  editedSubCategoryIndex: number | null = null;
  deleteBtnDisabled: boolean = false;
  // selectedValue: any = {value: "Cloth"};
  selectedValue: any = "";
  dropDownValue:any = [];
  showSpinner:boolean = true;
  showSpinnerTable:boolean = true;

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.subCategoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.getMaterial();
    this.getSubCategory();
  }

  onDropdownChange(value: any) {
    // Update the selectedValue when the dropdown value changes    
    // console.log(value);
    this.selectedValue = value?.value;
    console.log('Selected value:', this.selectedValue);
  }

  onSubmit() {
    if (this.subCategoryForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const name = this.subCategoryForm.controls['name'].value;
    
    if (this.editedSubCategoryIndex !== null) {
      this.subCategoryData[this.editedSubCategoryIndex].name = name;
      this.editedSubCategoryIndex = null;
    } else {
      const val = { name: name, material: this.selectedValue };
      this.subCategoryData.push(val);
      console.log(val);
      
    }
    this.subCategoryForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedSubCategoryIndex = index;
    this.subCategoryForm.patchValue({
      name: data.displayValue
    });
  }

  delete(index: number) {
    this.subCategoryData.splice(index, 1);
  }

  //API Call Get material
  getMaterial(){
    console.log("API Call");    
    this.common.getAllSettingsData("MID_MAT").subscribe((responseData:any)=>{
      let response = responseData?.body;
      if (responseData.status === 200) {
        this.dropDownValue = response;        
        this.selectedValue = response[0]?.displayValue;
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
}

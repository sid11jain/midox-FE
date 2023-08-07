import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-colorfabric',
  templateUrl: './add-colorfabric.component.html',
  styleUrls: ['./add-colorfabric.component.scss']
})
export class AddColorfabricComponent {

  colorFabricForm: FormGroup;
  colorFabricData: any[] = []; 
  colorFabricArray: any[] = []; 
  editedColorFabricIndex: number | null = null;
  deleteBtnDisabled: boolean = false;
  showDropdown: boolean = true;
  showSpinner:boolean = true;
  showSpinnerTable:boolean = true;
  dropDownValue:any = [];

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.colorFabricForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
    });
  }
  
  ngOnInit(){
    this.getColorName();
    this.getColorFabricCode();
  }

  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if(target.checked){
      this.showDropdown = false;
      this.colorFabricForm.patchValue({
        name: ""
      });
    }
    else{
      this.showDropdown = true;
    }
  }

  onSubmit() {
    if (this.colorFabricForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const name = this.colorFabricForm.controls['name'].value;
    const code = this.colorFabricForm.controls['code'].value;
    
    if (this.editedColorFabricIndex !== null) {
      this.colorFabricData[this.editedColorFabricIndex].name = name;
      this.colorFabricData[this.editedColorFabricIndex].code = code;
      this.editedColorFabricIndex = null;
    } else {
      const val = { name: name, code:code };
      this.colorFabricData.push(val);
    }
    this.colorFabricForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedColorFabricIndex = index;
    this.colorFabricForm.patchValue({
      name: data.parentEntityCd,
      code: data.displayValue
    });
  }

  delete(index: number) {
    this.colorFabricData.splice(index, 1);
  }

  //API Call Get color name
  getColorName(){    
    this.common.getAllSettingsData("MID_COL").subscribe((responseData:any)=>{
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

  //API Call Get color Fabric code
  getColorFabricCode(){    
    this.common.getAllSettingsData("MID_CFC").subscribe((responseData:any)=>{
      let response = responseData?.body;
      if (responseData.status === 200) {
        this.colorFabricArray = response;
        console.log(response);        
      }
      else{
        console.log("Error code: ",responseData?.status);        
      }
      this.showSpinnerTable = false;
    });
  }
}

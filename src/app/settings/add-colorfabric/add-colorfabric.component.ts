import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { MsgDialogComponent } from 'src/app/shared/msg-dialog/msg-dialog.component';

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
  // showDropdown: boolean = true;
  showSpinner:boolean = true;
  showSpinnerTable:boolean = true;
  dropDownValue:any = [];
  
  dialogTitle: string = "Colour Fabric Code";
  dialogMessage!: string;  
  editObject:any = {};
  key:string = "MID_CFC";
  key2:string = "MID_COL";

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.colorFabricForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
    });
  }
  
  async ngOnInit(){
    // this.getColorName();
    // this.getColorFabricCode();
     
    this.dropDownValue = await this.common.getDataFn(this.key2);
    this.showSpinner = false;
    this.colorFabricArray = await this.common.getDataFn(this.key);    
    this.showSpinnerTable = false;
  }

  // onCheckboxChange(event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   if(target.checked){
  //     this.showDropdown = false;
  //     this.colorFabricForm.patchValue({
  //       name: ""
  //     });
  //   }
  //   else{
  //     this.showDropdown = true;
  //   }
  // }

  // onSubmit() {
  //   if (this.colorFabricForm.invalid) {
  //     return;
  //   }
  //   this.deleteBtnDisabled = false;
  //   const name = this.colorFabricForm.controls['name'].value;
  //   const code = this.colorFabricForm.controls['code'].value;
    
  //   if (this.editedColorFabricIndex !== null) {
  //     this.colorFabricData[this.editedColorFabricIndex].name = name;
  //     this.colorFabricData[this.editedColorFabricIndex].code = code;
  //     this.editedColorFabricIndex = null;
  //   } else {
  //     const val = { name: name, code:code };
  //     this.colorFabricData.push(val);
  //   }
  //   this.colorFabricForm.reset();
  // }

  async onSubmit() {
    if (this.colorFabricForm.invalid) {
      return;
    }    
    this.showSpinner = true;
    
    const selectControl = this.colorFabricForm.get('name');
    selectControl?.enable();    
    
    this.deleteBtnDisabled = false;
    let colorVal = this.colorFabricForm?.value?.name;
    let colorCodeVal = this.colorFabricForm?.value?.code;
    if(this.editedColorFabricIndex !== null){
      //For update
      let obj = {    
        "entityCd": "",
        "parentEntityCd": "",
        "masterCd": "MID_CFC",
        "displayValue": "",
        "entityId": 0
      }
      obj.entityCd = this.editObject?.entityCd;
      obj.parentEntityCd = this.editObject?.parentEntityCd;
      obj.entityId = this.editObject?.entityId;
      obj.displayValue = colorCodeVal;
      
      this.colorFabricArray = await this.common.editDataFn(obj,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    else{
      // let currTime = Date.now();
      let obj = {    
        "parentEntityCd": "",
        "masterCd": "MID_CFC",
        "displayValue": ""
      }
      // obj.entityCd = "CFC_"+currTime;
      obj.parentEntityCd = colorVal;
      obj.displayValue = colorCodeVal;
      let data = [obj]  

      // this.addColourFabricCode(data);
      
      // Post API call
      this.colorFabricArray = await this.common.addDataFn(data,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    // this.showSpinner = true;
    
    this.editedColorFabricIndex = null;
    this.colorFabricForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editObject = data;
    this.editedColorFabricIndex = index;
    this.colorFabricForm.patchValue({
      name: data.parentEntityCd,
      code: data.displayValue
    });
    
    const selectControl = this.colorFabricForm.get('name');
    selectControl?.disable();
  }

  async delete(apiData: any) {
    // this.colorFabricData.splice(index, 1);
    
    this.showSpinner = true; 
    let entityCd = apiData?.entityCd;
    // this.deleteColourFabricCode(entityCd);
    
    // Delete API call
    this.colorFabricArray = await this.common.deleteDataFn(entityCd,this.dialogTitle,this.key);
    this.showSpinner = false;
  }

  
}

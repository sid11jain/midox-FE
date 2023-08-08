import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-process',
  templateUrl: './add-process.component.html',
  styleUrls: ['./add-process.component.scss']
})
export class AddProcessComponent {

  processForm: FormGroup;
  processData: any[] = [];
  processArray: any[] = [];
  editedProcessIndex: number | null = null;
  deleteBtnDisabled: boolean = false;
  showSpinner: boolean = true;

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.processForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.getProcess();
  }

  onSubmit() {
    if (this.processForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const name = this.processForm.controls['name'].value;
    
    if (this.editedProcessIndex !== null) {
      this.processData[this.editedProcessIndex].name = name;
      this.editedProcessIndex = null;
    } else {
      const val = { name: name };
      this.processData.push(val);
    }
    this.processForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedProcessIndex = index;
    this.processForm.patchValue({
      name: data.displayValue
    });
  }

  delete(index: number) {
    this.processData.splice(index, 1);
  }

  //API Call
  getProcess(){
    console.log("API Call");
    
    this.common.getAllSettingsData("MID_PROC").subscribe((responseData:any)=>{
      let response = responseData?.body;
      if (responseData.status === 200) {
        this.processArray = response;
        console.log(response);        
      }
      else{
        console.log("Error code: ",responseData?.status);        
      }
      this.showSpinner = false;
    });
  }
}

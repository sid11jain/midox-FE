import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-process-modal',
  templateUrl: './process-modal.component.html',
  styleUrls: ['./process-modal.component.scss']
})
export class ProcessModalComponent {
  @Input() modalValue:any = {}

  processModalForm: FormGroup;
  processModalData: any[] = [];
  editedProcessModalIndex: number | null = null;
  deleteBtnDisabled: boolean = false;
  showSpinner: boolean = true;
  
  // processDropdownValues: string[] = ["Process-1", 'Process-2'];
  processDropdownValues: any = [];

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.processModalForm = this.formBuilder.group({
      process: ['', Validators.required],
      wages: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.getProcess();
  }

  onSubmit() {
    if (this.processModalForm.invalid) {
      return;
    }

    
    const selectControl = this.processModalForm.get('process');
    selectControl?.enable();


    this.deleteBtnDisabled = false;
    const process = this.processModalForm.controls['process'].value;
    const wages = this.processModalForm.controls['wages'].value;
    
    if (this.editedProcessModalIndex !== null) {
      this.processModalData[this.editedProcessModalIndex].process = process;
      this.processModalData[this.editedProcessModalIndex].wages = wages;
      this.editedProcessModalIndex = null;
    } else {
      const val = { process: process, wages:wages };
      this.processModalData.push(val);
    }
    this.processModalForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedProcessModalIndex = index;
    this.processModalForm.patchValue({
      process: data.process,
      wages: data.wages
    });

    
    const selectControl = this.processModalForm.get('process');
    selectControl?.disable();
  }

  delete(index: number) {
    this.processModalData.splice(index, 1);
  }

  apiCallSaveData(){
    let finalData = {designData:this.modalValue, processData:this.processModalData};
    console.log("final processModalData: ",finalData);
    
  }

  //API Call
  getProcess(){    
    this.common.getAllSettingsData("MID_PROC").subscribe((responseData:any)=>{
      let response = responseData?.body;
      if (responseData.status === 200) {
        this.processDropdownValues = response;
        console.log(response);        
      }
      else{
        console.log("Error code: ",responseData?.status);        
      }
      this.showSpinner = false;
    });
  }

}

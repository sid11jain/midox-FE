import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  
  processDropdownValues: string[] = ["Process-1", 'Process-2'];

  constructor(private formBuilder: FormBuilder) {
    this.processModalForm = this.formBuilder.group({
      process: ['', Validators.required],
      wages: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.processModalForm.invalid) {
      return;
    }
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
  }

  delete(index: number) {
    this.processModalData.splice(index, 1);
  }

  apiCallSaveData(){
    let finalData = {designData:this.modalValue, processData:this.processModalData};
    console.log("final processModalData: ",finalData);
    
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-process',
  templateUrl: './add-process.component.html',
  styleUrls: ['./add-process.component.scss']
})
export class AddProcessComponent {

  processForm: FormGroup;
  processData: any[] = [];
  editedProcessIndex: number | null = null;
  deleteBtnDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.processForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
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
      name: data.name
    });
  }

  delete(index: number) {
    this.processData.splice(index, 1);
  }
}

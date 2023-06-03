import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-design',
  templateUrl: './add-design.component.html',
  styleUrls: ['./add-design.component.scss']
})
export class AddDesignComponent {

  designForm: FormGroup;
  designData: any[] = [];
  editedDesignIndex: number | null = null;
  deleteBtnDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.designForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.designForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const name = this.designForm.controls['name'].value;
    
    if (this.editedDesignIndex !== null) {
      this.designData[this.editedDesignIndex].name = name;
      this.editedDesignIndex = null;
    } else {
      const val = { name: name };
      this.designData.push(val);
    }
    this.designForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedDesignIndex = index;
    this.designForm.patchValue({
      name: data.name
    });
  }

  delete(index: number) {
    this.designData.splice(index, 1);
  }
}

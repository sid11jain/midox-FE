import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent {

  brandForm: FormGroup;
  brandData: any[] = [];
  editedBrandIndex: number | null = null;
  deleteBtnDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.brandForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.brandForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const name = this.brandForm.controls['name'].value;
    
    if (this.editedBrandIndex !== null) {
      this.brandData[this.editedBrandIndex].name = name;
      this.editedBrandIndex = null;
    } else {
      const val = { name: name };
      this.brandData.push(val);
    }
    this.brandForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedBrandIndex = index;
    this.brandForm.patchValue({
      name: data.name
    });
  }

  delete(index: number) {
    this.brandData.splice(index, 1);
  }
}

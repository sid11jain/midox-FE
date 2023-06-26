import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent {

  supplierForm: FormGroup;
  supplierData: any[] = [];
  editedSupplierIndex: number | null = null;
  deleteBtnDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.supplierForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.supplierForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const name = this.supplierForm.controls['name'].value;
    
    if (this.editedSupplierIndex !== null) {
      this.supplierData[this.editedSupplierIndex].name = name;
      this.editedSupplierIndex = null;
    } else {
      const val = { name: name };
      this.supplierData.push(val);
    }
    this.supplierForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedSupplierIndex = index;
    this.supplierForm.patchValue({
      name: data.name
    });
  }

  delete(index: number) {
    this.supplierData.splice(index, 1);
  }
}

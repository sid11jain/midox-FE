import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent {

  suppliers: any[] = [];
  supplierForm!: FormGroup;
  deleteBtnDisabled: boolean = false;
  editedMaterialIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm(): void {
    this.supplierForm = this.fb.group({
      supplierName: ['', [Validators.required, Validators.minLength(3)]],
      mobNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
      gstin: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{15}$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      remark: ['', Validators.required]
    });
  }

  onSubmit(): void {
    // this.deleteBtnDisabled = false;
    // if (this.supplierForm.valid) {
    //   const newSupplier = { ...this.supplierForm.value };
    //   this.suppliers.push(newSupplier);
    //   this.resetForm();
    // } else {
    //   console.log('Form is invalid. Please check the inputs.');
    // }
    if (this.supplierForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const supplierName = this.supplierForm.controls['supplierName'].value;
    const mobNumber = this.supplierForm.controls['mobNumber'].value;
    const gstin = this.supplierForm.controls['gstin'].value;
    const email = this.supplierForm.controls['email'].value;
    const address = this.supplierForm.controls['address'].value;
    const remark = this.supplierForm.controls['remark'].value;
    
    if (this.editedMaterialIndex !== null) {
      this.suppliers[this.editedMaterialIndex].supplierName = supplierName;
      this.suppliers[this.editedMaterialIndex].mobNumber = mobNumber;
      this.suppliers[this.editedMaterialIndex].gstin = gstin;
      this.suppliers[this.editedMaterialIndex].email = email;
      this.suppliers[this.editedMaterialIndex].address = address;
      this.suppliers[this.editedMaterialIndex].remark = remark;
      this.editedMaterialIndex = null;
    } else {
      const newMaterial = { 
        supplierName: supplierName, 
        mobNumber: mobNumber, 
        gstin: gstin, 
        email: email, 
        address: address, 
        remark: remark, 
      };
      this.suppliers.push(newMaterial);
    }
    this.supplierForm.reset();
  }


  editSupplier(supplier: any, index:number): void {
    // Implement the edit functionality here
    // console.log('Editing supplier:', supplier);
    // You can pre-fill the form with the selected supplier data for editing.
    // For example, this.supplierForm.setValue(supplier);
    this.deleteBtnDisabled = true;
    this.editedMaterialIndex = index;
    this.supplierForm.patchValue({
      supplierName: supplier.supplierName,
      mobNumber: supplier.mobNumber,
      gstin: supplier.gstin,
      email: supplier.email,
      address: supplier.address,
      remark: supplier.remark
    });
  }

  deleteSupplier(supplier: any): void {
    // Implement the delete functionality here
    console.log('Deleting supplier:', supplier);
    const index = this.suppliers.indexOf(supplier);
    if (index !== -1) {
      this.suppliers.splice(index, 1);
    }
  }

  resetForm(): void {
    this.supplierForm.reset();
  }

  // supplierForm: FormGroup;
  // supplierData: any[] = [];
  // editedSupplierIndex: number | null = null;
  // deleteBtnDisabled: boolean = false;

  // constructor(private formBuilder: FormBuilder) {
  //   this.supplierForm = this.formBuilder.group({
  //     name: ['', Validators.required]
  //   });
  // }

  // onSubmit() {
  //   if (this.supplierForm.invalid) {
  //     return;
  //   }
  //   this.deleteBtnDisabled = false;
  //   const name = this.supplierForm.controls['name'].value;
    
  //   if (this.editedSupplierIndex !== null) {
  //     this.supplierData[this.editedSupplierIndex].name = name;
  //     this.editedSupplierIndex = null;
  //   } else {
  //     const val = { name: name };
  //     this.supplierData.push(val);
  //   }
  //   this.supplierForm.reset();
  // }

  // edit(data: any, index: number) {
  //   this.deleteBtnDisabled = true;
  //   this.editedSupplierIndex = index;
  //   this.supplierForm.patchValue({
  //     name: data.name
  //   });
  // }

  // delete(index: number) {
  //   this.supplierData.splice(index, 1);
  // }
}

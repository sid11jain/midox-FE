import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent {
  brands: any[] = [];
  brandForm!: FormGroup;
  deleteBtnDisabled: boolean = false;
  editedMaterialIndex: number | null = null;

  constructor(private fb: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.initForm();
  }

  initForm(): void {
    this.brandForm = this.fb.group({
      brandName: ['', [Validators.required, Validators.minLength(3)]],
      mobNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
      gstin: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{15}$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      remark: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.brandForm.invalid) {
      return;
    }
    console.log('Form values:', this.brandForm.value);
    this.deleteBtnDisabled = false;
    const brandName = this.brandForm.controls['brandName'].value;
    const mobNumber = this.brandForm.controls['mobNumber'].value;
    const gstin = this.brandForm.controls['gstin'].value;
    const email = this.brandForm.controls['email'].value;
    const address = this.brandForm.controls['address'].value;
    const remark = this.brandForm.controls['remark'].value;
    
    if (this.editedMaterialIndex !== null) {
      this.brands[this.editedMaterialIndex].brandName = brandName;
      this.brands[this.editedMaterialIndex].mobNumber = mobNumber;
      this.brands[this.editedMaterialIndex].gstin = gstin;
      this.brands[this.editedMaterialIndex].email = email;
      this.brands[this.editedMaterialIndex].address = address;
      this.brands[this.editedMaterialIndex].remark = remark;
      this.editedMaterialIndex = null;
    } else {
      const newMaterial = { 
        brandName: brandName, 
        mobNumber: mobNumber, 
        gstin: gstin, 
        email: email, 
        address: address, 
        remark: remark, 
      };
      this.brands.push(newMaterial);
    }
    this.brandForm.reset();
  }

  editSupplier(supplier: any, index:number): void {    
    this.deleteBtnDisabled = true;
    this.editedMaterialIndex = index;
    this.brandForm.patchValue({
      brandName: supplier.brandName,
      mobNumber: supplier.mobNumber,
      gstin: supplier.gstin,
      email: supplier.email,
      address: supplier.address,
      remark: supplier.remark
    });
  }

  deleteSupplier(brand: any): void {
    // Implement the delete functionality here
    const index = this.brands.indexOf(brand);
    if (index !== -1) {
      this.brands.splice(index, 1);
    }
  }

  resetForm(): void {
    this.brandForm.reset();
  }

  // brandForm: FormGroup;
  // brandData: any[] = [];
  // editedBrandIndex: number | null = null;
  // deleteBtnDisabled: boolean = false;

  // constructor(private formBuilder: FormBuilder) {
  //   this.brandForm = this.formBuilder.group({
  //     name: ['', Validators.required]
  //   });
  // }

  // onSubmit() {
  //   if (this.brandForm.invalid) {
  //     return;
  //   }
  //   this.deleteBtnDisabled = false;
  //   const name = this.brandForm.controls['name'].value;
    
  //   if (this.editedBrandIndex !== null) {
  //     this.brandData[this.editedBrandIndex].name = name;
  //     this.editedBrandIndex = null;
  //   } else {
  //     const val = { name: name };
  //     this.brandData.push(val);
  //   }
  //   this.brandForm.reset();
  // }

  // edit(data: any, index: number) {
  //   this.deleteBtnDisabled = true;
  //   this.editedBrandIndex = index;
  //   this.brandForm.patchValue({
  //     name: data.name
  //   });
  // }

  // delete(index: number) {
  //   this.brandData.splice(index, 1);
  // }
}

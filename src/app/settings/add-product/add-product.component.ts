import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  productForm: FormGroup;
  productData: any[] = [];
  editedProductIndex: number | null = null;
  deleteBtnDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const name = this.productForm.controls['name'].value;
    
    if (this.editedProductIndex !== null) {
      this.productData[this.editedProductIndex].name = name;
      this.editedProductIndex = null;
    } else {
      const val = { name: name };
      this.productData.push(val);
    }
    this.productForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedProductIndex = index;
    this.productForm.patchValue({
      name: data.name
    });
  }

  delete(index: number) {
    this.productData.splice(index, 1);
  }
}

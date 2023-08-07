import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  productForm: FormGroup;
  productData: any[] = [];
  productArray: any[] = [];
  editedProductIndex: number | null = null;
  deleteBtnDisabled: boolean = false;
  showSpinner: boolean = true;

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.getProduct();
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
      name: data.displayValue
    });
  }

  delete(index: number) {
    this.productData.splice(index, 1);
  }

  //API Call
  getProduct(){
    console.log("API Call");
    
    this.common.getAllSettingsData("MID_PROD").subscribe((responseData:any)=>{
      let response = responseData?.body;
      if (responseData.status === 200) {
        this.productArray = response;
        console.log(response);        
      }
      else{
        console.log("Error code: ",responseData?.status);        
      }
      this.showSpinner = false;
    });
  }
}

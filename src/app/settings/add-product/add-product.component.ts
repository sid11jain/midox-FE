import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { MsgDialogComponent } from 'src/app/shared/msg-dialog/msg-dialog.component';

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
  
  dialogTitle: string = "Product";
  key: string = "MID_PROD";
  dialogMessage!: string;  
  editObject:any = {};

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  async ngOnInit(){
    // this.getProduct();
     
    this.productArray = await this.common.getDataFn(this.key);
    this.showSpinner = false;
  }

  async onSubmit() {
    if (this.productForm.invalid) {
      return;
    }    
    this.showSpinner = true;
    this.deleteBtnDisabled = false;
    let inputVal = this.productForm.value.name;
    if(this.editedProductIndex !== null){
      //For update
      let obj = {    
        "entityCd": "UNIT_KG8",
        "parentEntityCd": null,
        "masterCd": "MID_PROD",
        "displayValue": "Kg8",
        "entityId": 0
      }
      obj.entityCd = this.editObject?.entityCd;
      obj.entityId = this.editObject?.entityId;
      obj.displayValue = inputVal;
      
      // this.editProduct(obj);
      
      this.productArray = await this.common.editDataFn(obj,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    else{
      // let currTime = Date.now();
      let obj = {    
        "parentEntityCd": null,
        "masterCd": "MID_PROD",
        "displayValue": "Kg8"
      }
      // obj.entityCd = "PROD_"+currTime;
      obj.displayValue = inputVal;
      let data = [obj]   

      // this.addProduct(data);
      
      // Post API call
      this.productArray = await this.common.addDataFn(data,this.dialogTitle,this.key);
      this.showSpinner = false;
    }
    // this.showSpinner = true;
    
    this.editedProductIndex = null;
    this.productForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;    
    this.editObject = data;
    this.editedProductIndex = index;
    this.productForm.patchValue({
      name: data.displayValue
    });
  }

  async delete(apiData: any) {
    // this.productData.splice(index, 1);
    
    this.showSpinner = true; 
    let entityCd = apiData?.entityCd;
    // this.deleteProduct(entityCd);
    
    // Delete API call
    this.productArray = await this.common.deleteDataFn(entityCd,this.dialogTitle,this.key);
    this.showSpinner = false;
  }

}

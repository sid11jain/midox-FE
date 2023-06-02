import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  userForm:any = FormGroup;

  supplierData:any=["Midox","Ciana"];
  materialData:any=["Cotton","Button","Dhaga"];
  subCategoryData:any=["PC hosiery sinkar fabric","CO hosiery Matty fabric","Cotton hosiery sinkar fabric"];
  measurementTypeData:any=["KG","Meter"];
  colorFabricCodeData:any=["m-1516","C-2303"];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      billNumber: ['', [Validators.required, Validators.minLength(3)]],
      packingSlipNumber: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      currentFullTimestamp: [''],
      supplier: ['', Validators.required],
      isCloth: ['', Validators.required],
      material: ['', Validators.required],
      subCategory: ['', Validators.required],
      colorFabricCode: ['', Validators.required],
      measurementType: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      amount: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const currentFullTimestamp = new Date();
    this.userForm.patchValue({ currentFullTimestamp });
    
    console.log('Form values:', this.userForm.value);
  }
}

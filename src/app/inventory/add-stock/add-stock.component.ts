import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  userForm:any = FormGroup;
  showClothData:boolean = true;

  supplierData:any=["Midox","Ciana"];
  materialData:any=["Cloth","Accessory"];
  subCategoryClothData:any=["Sinkar fabric","Matty fabric","Wool","Cotton"];
  subCategoryAccessoryData:any=["Button","Dhaga"];
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

  materialBtnClick(material:any){
    const selectedMaterialValue = material.value as string;
    
    // Disable the select control based on a condition
    const selectControl = this.userForm.get('colorFabricCode');
    if(selectedMaterialValue == 'Cloth'){
      this.showClothData = true;
      selectControl.enable();
    }
    else{
      this.showClothData = false;
      selectControl.disable();
    }
    console.log("Selected value: ", selectedMaterialValue);    
  }
}

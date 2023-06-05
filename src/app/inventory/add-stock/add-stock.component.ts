import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  userForm:any = FormGroup;  
  addStocksList:any = [];
  supplierData:any=["Midox","Ciana"];
  materialData:any=["Cloths","Accessories"];
  subCategoryData:any=["PC hosiery sinkar fabric","CO hosiery Matty fabric","Cotton hosiery sinkar fabric"];
  showClothData:boolean = true;
  subCategoryClothData:any=["Sinkar fabric","Matty fabric","Wool","Cotton"];
  subCategoryAccessoryData:any=["Button","Dhaga"];
  measurementTypeData:any=["KG","Meter"];
  colorFabricCodeData:any=["m-1516","C-2303"];
  editStockForm:number|null = null;

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
    console.log(1);
    
    if (this.userForm.invalid) {
      return;
    }
    console.log(2);
    
    const currentFullTimestamp = new Date();
    this.userForm.patchValue({ currentFullTimestamp });
    
    console.log('Form values:', this.userForm.value);
    this.userForm.reset();
  }

  addStocks(data:any){
    this.toEnableDisableColorFabric(true);

    const currentFullTimestamp = new Date();
    data.currentFullTimestamp = currentFullTimestamp;
    if (this.editStockForm !== null &&  this.addStocksList.length) {
      this.addStocksList.splice(this.editStockForm, 1)
    }
    this.addStocksList.push(data);

    console.log("Add stock data ",this.addStocksList);
    this.userForm.reset();
    let dataObj = {
      billNumber: data.billNumber,
      packingSlipNumber: data.packingSlipNumber,
      date: data.date,
      supplier: data.supplier
    }
    this.userForm.patchValue(dataObj);
    this.editStockForm = null;
  }

  setDataInStockForm(data:any, i:any){
    this.editStockForm = i;
    let dataObj = {
      material: data.material,
      subCategory: data.subCategory,
      colorFabricCode: data.colorFabricCode,
      measurementType: data.measurementType,
      quantity: data.quantity,
      amount: data.amount
    }
    this.userForm.patchValue(dataObj);
  }

  materialBtnClick(material:any){
    const selectedMaterialValue = material.value as string;    
    if(selectedMaterialValue == 'Cloths'){
      this.showClothData = true;
      this.toEnableDisableColorFabric(true);
    }
    else{
      this.showClothData = false;
      this.toEnableDisableColorFabric(false);
    } 
  }

  deleteStock(index: number) {
    this.addStocksList.splice(index, 1);
  } 

  submitForm(){
    this.userForm.reset();
    console.log("Form value : ", this.addStocksList);    

    // Extracting the common keys and the remaining fields
    const commonKeys = ['billNumber', 'date', 'packingSlipNumber', 'supplier'];
    const extractedData:any = {
        common: {},
        data: []
    };

    this.addStocksList.forEach((item:any) => {
        const commonData:any = {};
        const remainingData:any = {};

        Object.entries(item).forEach(([key, value]) => {
            if (commonKeys.includes(key)) {
                commonData[key] = value;
            } else {
                remainingData[key] = value;
            }
        });

        extractedData.common = commonData;
        extractedData.data.push(remainingData);
    });

    console.log("Final Data : ",extractedData);    

    this.toEnableDisableColorFabric(true);
    this.addStocksList = [];
  }

  toEnableDisableColorFabric(flag:boolean){
    // Disable the select control based on a condition
    const selectControl = this.userForm.get('colorFabricCode');
    if(flag){
      selectControl.enable();
    }
    else{
      selectControl.disable();
    }
  }
}
